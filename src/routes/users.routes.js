import { Router } from "express";
import multer from "multer";

import { MULTER } from "../configs/upload";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import usersController from "../controllers/UsersController";
import userAvatarController from "../controllers/UserAvatarController";

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

export default usersRoutes;
