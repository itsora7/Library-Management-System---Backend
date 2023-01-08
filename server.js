import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

//connect mongodb
import { connectDB } from "./src/config/db.js";
connectDB();

//middlewares
app.use(express.json());
app.use(cors());

//global error handleer

app.use((error, req, res, next) => {
  console.log(error.message);
  const errorCode = error.errorCode || 500;
  res.status(
    errorcode.json({
      status: "error",
      message: error.message,
    })
  );
});

// api router
import userRouter from "./src/router/userRouter.js";
app.use("/api/v1/user", userRouter);
//api untaught request
app.use("*", (req, res) => {
  res.json({
    message: "System status is unidentified",
  });
});

// run the server

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is unning at http://localhost:${PORT}`);
});
