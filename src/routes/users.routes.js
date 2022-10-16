const { Router } = require("express");
const userRouter = Router();

const userController = require("../controllers/UserController");

userRouter.post("/", userController.create);
userRouter.delete("/:id", userController.remove);

module.exports = userRouter;
