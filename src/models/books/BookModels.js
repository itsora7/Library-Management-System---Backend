//add book

import BookSchema from "./BookSchema.js";

export const addBook = (bookInfo) => {
  return BookSchema(bookInfo).save();
};
export const getBookByisbn = (isbn) => {
  return BookSchema.findOne({ isbn });
};
export const getAllBooks = () => {
  return BookSchema.find();
};
export const getBookByID = (_id) => {
  return BookSchema.findById(_id);
};
export const findBookAndUpdate = (_id, obj) => {
  return BookSchema.findByIdAndUpdate(_id, obj, { new: true });
};
export const deleteBook = (_id) => {
  return BookSchema.findByIdAndDelete(_id);
};
export const getBorrowedBooks = (userID) => {
  return BookSchema.find({ borrowedBy: { $in: userID } });
};
