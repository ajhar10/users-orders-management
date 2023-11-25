import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/", UserControllers.createUser);

router.get("/", UserControllers.getAllUsers);

router.get("/:userId", UserControllers.getSingleUser);

router.put("/:userId", UserControllers.updateSingleUser);

router.put("/:userId", UserControllers.updateUserData);
//Delete user
router.delete("/:userId", UserControllers.deleteUserData);
//Insert order user collection
router.put("/:userId/orders", UserControllers.insertOrderCollection);
//Get user order Data
router.get("/:userId/orders", UserControllers.getUserOrderData);

//User order price calculate
router.get(
  "/:userId/orders/total-price",
  UserControllers.CalculateAllUserOrder
);

export const UserRoutes = router;
