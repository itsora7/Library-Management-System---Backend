//add book

import BookSchema from "./BookSchema.js";

export const addBook = (bookInfo) => {
  return BookSchema(bookInfo).save();
};
