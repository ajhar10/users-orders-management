import { User } from "./user.model";
import { TUsers } from "./user.interface";

const createUserIntoDB = async (userData: TUsers) => {
  const result = await User.create(userData);
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await User.aggregate([
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);
  return result;
};
const getSingleUserFromDB = async (id: string) => {
  if (await User.isUserExists(id)) {
    const result = await User.aggregate([
      { $match: { userId: Number(id) } },
      {
        $project: {
          userId: 1,
          username: 1,
          fullName: 1,
          age: 1,
          email: 1,
          isActive: 1,
          address: 1,
          hobbies: 1,
        },
      },
    ]);
    return result;
  } else {
    throw new Error("User not found");
  }
};
const updateSingleUserFromDB = async (id: string) => {
  if (await User.isUserExists(id)) {
    const result = await User.aggregate([
      { $match: { userId: Number(id) } },
      {
        $project: {
          userId: 1,
          username: 1,
          fullName: 1,
          age: 1,
          email: 1,
          isActive: 1,
          address: 1,
          hobbies: 1,
        },
      },
    ]);
    return result;
  } else {
    throw new Error("User not found");
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
};
