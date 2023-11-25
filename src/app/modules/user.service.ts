import { User } from "./user.model";
import { TUsers } from "./user.interface";

const createUserIntoDB = async (userData: TUsers) => {
  const result = await User.create(userData);
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
};
