import UserSchema from "./UserSchema.js";

export const getUserEmail = (email) => {
  return UserSchema.findOne({ email });
};

export const createUser = (userData) => {
  return UserSchema(userData).save();
};
export const getUser = (userData) => {
  return UserSchema.findOne(userData);
};
export const getUserById = (userID) => {
  return UserSchema.findById(userID);
};
export const updateUserInfo = (userID, userData) => {
  return UserSchema.findOneAndUpdate(userID, userData, { new: true });
};
