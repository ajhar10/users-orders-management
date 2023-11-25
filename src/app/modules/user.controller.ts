import { Request, Response } from "express";
import { UserServices } from "./user.service";
import UserValidationSchema from "./user.validator";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const zodValidateData = UserValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zodValidateData);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      err,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
};
