const { Router } = require("express");

const routes = Router();

const userRouter = require("./users.routes");

routes.use("/users", userRouter);

module.exports = routes;
