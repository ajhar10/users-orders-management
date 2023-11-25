import { Schema, model } from "mongoose";
import {
  TAddress,
  TFullName,
  TUsers,
  TOrder,
  UserModel,
} from "./user.interface";
import config from "../config";
import bcrypt from "bcrypt";

const userFullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "last Name is required"],
    trim: true,
  },
});

const userAddressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, "street name/no is required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City Name is required"],
    trim: true,
  },
  country: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
  },
});
const userOrderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, "street name/no is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, "Amount is required"],
    trim: true,
  },
});

const userSchema = new Schema<TUsers, UserModel>(
  {
    userId: {
      type: Number,
      unique: true,
      required: [true, "UserId is required"],
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: [true, "User Name is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Pass is required"],
    },
    fullName: {
      type: userFullNameSchema,
      required: true,
    },
    age: {
      type: Number,
      required: [true, "User Age is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User mail is required"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    hobbies: {
      type: [String],
      required: [true, "User hobbies field is required"],
      trim: true,
    },
    address: {
      type: userAddressSchema,
      required: [true, "Address field is required"],
    },
    orders: {
      type: [userOrderSchema],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//save Middleware
userSchema.post("save", function (doc, next) {
  doc.password = undefined;
  next();
});

// Password Hashing
userSchema.pre("save", async function (next) {
  const user = this; //doc
  user.password = await bcrypt.hash(user.password, Number(config.salt_round));
  next();
});
//Delete password field
userSchema.methods.toJSON = function () {
  const Obj = this.toObject();
  delete Obj.password;
  return Obj;
};

//creating a custom static method
userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ userId: Number(id) });
  return existingUser;
};
export const User = model<TUsers, UserModel>("User", userSchema);
