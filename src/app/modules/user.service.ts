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

//Update single user database
const updateUserDataDB = async (userId: string, userData: TUsers) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found");
  }
  const result = User.findOneAndUpdate(
    { userId },
    {
      $set: userData,
    },
    { new: true, runValidators: true }
  );
  return result;
};

//Delete single user database
const DeleteUserDataDB = async (userId: string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found");
  }
  const result = User.findOneAndDelete({ userId });
  return result;
};

//Insert Order to  user data collection
const insertOrderToUserDataC = async (
  userId: string,
  orderData: {
    productName: string;
    price: number;
    quantity: number;
  }
) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found");
  }
  const { productName, price, quantity } = orderData;
  const result = User.findOneAndUpdate(
    { userId, orders: { $exists: true } },
    { $push: { orders: { productName, price, quantity } } },
    { upsert: true, new: true }
  );
  return result;
};

//Get  user all orders Data
const getAllOrderToUserDataC = async (userId: string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found ");
  }
  const result = User.findOne({ userId }).select("orders");
  return result;
};

//User all orders price calculate
const calculateAllOrder = async (userId: string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error("User not found ");
  }
  const result = await User.findOne({ userId }).select("orders");

  const totalPrice = (result?.orders || []).reduce(
    (total: number, order: { price?: number }) => {
      return total + (order.price || 0);
    },
    0
  );
  return totalPrice;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserDataDB,
  DeleteUserDataDB,
  insertOrderToUserDataC,
  getAllOrderToUserDataC,
  calculateAllOrder,
};
