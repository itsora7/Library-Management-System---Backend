import express from "express";
import {
  addBook,
  deleteBook,
  findBookAndUpdate,
  getAllBooks,
  getBookByID,
  getBookByisbn,
  getBorrowedBooks,
} from "../models/books/BookModels.js";
import { postTransaction } from "../models/transaction/TransactionModels.js";
import { getUserById } from "../models/users/UserModels.js";

const router = express.Router();

//add a book

router.post("/", async (req, res, next) => {
  const { isbn } = req.body;
  try {
    const bookExists = await getBookByisbn(isbn);

    if (bookExists?._id) {
      return res.json({
        status: "error",
        message: "Books already exists",
      });
    }
  } catch (error) {}
  try {
    const book = await addBook(req.body);

    if (book?._id) {
      return res.json({
        status: "success",
        message: "Book added successfullly",
      });
    }
    res.json({
      status: "error",
      message: "Unable to add book. Please try again!",
    });
  } catch (error) {
    next();
  }
});
router.get("/", async (req, res, next) => {
  try {
    const books = await getAllBooks();

    if (books) {
      return res.status(200).json({
        books,
      });
    }
    return;
  } catch (error) {
    next(error);
  }
});
router.post("/borrow", async (req, res, next) => {
  try {
    // const bookID = await getAllBooks();
    const bookID = req.body.bookID;
    const { authorization } = req.headers;
    const book = await getBookByID(bookID);
    const user = await getUserById(authorization);

    if (book?.id && user?._id) {
      if (book?.borrowedBy.length) {
        return res.json({
          status: "error",
          message:
            "This book has already been borrowed and will be available once it has been returned",
        });
      }
    }
    const { isbn, thumbinal, title, author, year } = book;
    const transaction = await postTransaction({
      borrowedBy: user._id,
      borrowedBook: {
        isbn,
        thumbinal,
        title,
        author,
        year,
      },
    });

    const updateBook = await findBookAndUpdate(bookID, {
      borrowedBy: [...book.borrowedBy, user._id],
    });
    if (transaction?._id) {
      const updateBook = await findBookAndUpdate(bookID, {
        borrowedBy: [...book.borrowedBy, user._id],
      });
    }
    return updateBook?._id
      ? res.json({
          status: "success",
          message: "You have borrowed this book",
          updateBook,
        })
      : res.json({
          status: "error",
          message: "Something went wron. Please try again later!",
        });
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const del = await deleteBook(req.body.bookID);
    del?._id
      ? res.json({
          status: "success",
          message: "Book has been deleted from the system!",
        })
      : res.json({
          status: "error",
          message: "Unable to delete. Please try again later!",
        });
  } catch (error) {
    next(error);
  }
});

//get books borrowed by specific user

router.get("/borrowedByUser", async (req, res, next) => {
  try {
    const result = await getBorrowedBooks(req.headers.authorization);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

// Return book
router.patch("/return", async (req, res, next) => {
  try {
    const book = await getBookByID(req.body.bookID);
    const user = await getUserById(req.headers.authorization);

    if (book?._id && user?._id) {
      const updateBook = await findBookAndUpdate(book._id, {
        $pull: { borrowedBy: user._id },
      });
      updateBook?._id
        ? res.json({
            status: "success",
            message: "You have returned this book",
          })
        : res.json({
            status: "error",
            message: "Unable to return book. Please try again",
          });
    }
  } catch (error) {
    next(error);
  }
});
export default router;
