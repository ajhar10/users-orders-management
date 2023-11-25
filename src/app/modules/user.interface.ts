import { Model } from "mongoose";

export type TFullName = {
  firstName: string;
  lastName: string;
};
export type TAddress = {
  street: string;
  city: string;
  country: string;
};
export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};
export type TUsers = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders: TOrder[];
};

//creating a new static instance
export interface UserModel extends Model<TUsers> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TUsers | null>;
}
