import express from "express";
import { hashPassword, comparePassword } from "../helpers/bcrypt.js";
import { createUser, getUserEmail } from "../models/users/UserModels.js";

const router = express.Router();

//create user

router.post("/", async (req, res, next) => {
  const { email } = req.body;

  try {
    const userExist = await getUserEmail(email);
    if (userExist) {
      return res.json({
        status: "error",
        message: "User already exists. Please log in",
      });
    }
    //encrypt password
    const hashPass = hashPassword(req.body.password);
    if (hashPass) {
      req.body.password = hashPass;
      const user = await createUser(req.body);

      if (user?._id) {
        return res.json({
          status: "success",
          message: "User has been created successfully",
        });
      }
      return res.json({
        statu: "error",
        message: "User not created, Please try again",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUserEmail(email);
    if (user?.id) {
      //check id password is valid
      const isPassMatch = comparePassword(req.body.password, user.password);
      if (isPassMatch) {
        user.password = undefined;
        return res.json({
          status: "success",
          message: "Login Successfully",
          user,
        });
      }
      res.json({
        status: "error",
        message: "Email or Password is wrong",
      });
    } else {
      res.json({
        status: "error",
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
export default router;
