import { Router } from "express";
import userController from "../controllers/UserController";

const userRouter = Router();

userRouter.post("/", userController.create);
userRouter.delete("/:id", userController.remove);

export default userRouter;
