const { Router } = require("express");
const multer = require("multer");
const { MULTER } = require("../configs/upload");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const usersController = require("../controllers/UsersController");
const userAvatarController = require("../controllers/UserAvatarController");

const usersRoutes = Router();
const upload = multer(MULTER);

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

module.exports = usersRoutes;
