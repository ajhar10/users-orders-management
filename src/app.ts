import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user.route";
const app: Application = express();

app.use(cors());
app.use(express.json());

//Routes
app.use("/api/users", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Users Management Api!");
});

export default app;
