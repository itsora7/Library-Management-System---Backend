import express from "express";
import { addBook } from "../models/books/BookModels.js";

const router = express.Router();

//add a book

router.post("/", async (req, res, next) => {
  try {
    const book = await addBook(req.body);

    if (book?.id) {
      res.json({
        status: "success",
        message: "Book added successfullly",
      });
    }
    res.json({
      status: "error",
      message: "Unable to add book. Please try again!",
    });
  } catch (error) {}
});

export default router;
