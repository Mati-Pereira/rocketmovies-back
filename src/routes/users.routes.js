const { Router } = require("express");
const userRouter = Router();

const userController = require("../controllers/UserController");

userRouter.post("/", userController.create);

module.exports = userRouter;
