import mongoose from "mongoose";

export const transactionSchema = new mongoose.Schema(
  {
    borrowedBy: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      userFname: { type: String },
      userLname: { type: String },
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

export default mongoose.model("Transaction", transactionSchema);
