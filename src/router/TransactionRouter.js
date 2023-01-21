import express from "express";
import { getallTranasction } from "../models/transaction/TransactionModels.js";

const router = express.Router();

//get all transaction

router.get("/", async (req, res, next) => {
  try {
    const tranasctions = await getallTranasction();
    res.json(tranasctions);
  } catch (error) {
    next(error);
  }
});

export default router;
