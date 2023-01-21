import transactionSchema from "./TransactionSchema.js";

export const postTransaction = (obj) => {
  return transactionSchema(obj).save();
};
export const getallTranasction = () => {
  return transactionSchema.find();
};
export const getTranasctionByQuery = (userId, isbn) => {
  return transactionSchema.findOne({
    "borrowedBy.userId": { $in: userId },
    "borrowedBook.isbn": { $in: isbn },
  });
};

export const updateTransaction = (_id, obj) => {
  return transactionSchema.findByIdAndUpdate(_id, obj, { new: true });
};
