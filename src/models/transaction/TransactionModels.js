import { tranacitonSchema } from "./TransactionSchema.js";

export const postTransaction = (obj) => {
  return tranacitonSchema(obj).save();
};
export const getallTranasction = () => {
  return tranacitonSchema.find();
};
