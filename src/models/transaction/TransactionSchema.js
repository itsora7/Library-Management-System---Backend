import mongoose from "mongoose";

export const tranacitonSchema = new mongoose.Schema(
  {
    borrowedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    borrowedBook: {
      isbn: { type: String },
      thunbinal: { type: String },
      title: { type: String },
      author: { type: String },
      year: { type: Number },
    },
    returnDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
