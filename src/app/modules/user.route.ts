import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/", UserControllers.createUser);

router.get("/", UserControllers.getAllUsers);

// router.get('/:studentId', UserControllers.getSingleStudent)

// router.delete('/:studentId', UserControllers.delSingleStudent)

export const UserRoutes = router;
