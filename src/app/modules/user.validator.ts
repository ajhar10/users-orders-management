import { z } from "zod";

const UserFullNameSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1),
});
const UserAddressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});
const UserOrder = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1),
  password: z.string(),
  fullName: UserFullNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: UserAddressSchema,
  orders: z.array(UserOrder).optional(),
});

export default UserValidationSchema;
