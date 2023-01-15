import { getUser } from "../models/users/UserModels.js";

export const isAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    const user = authorization ? await getUser({ _id: authorization }) : null;
    user?.id ? next() : res.json({ status: "error", message: "Unauthorrized" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
