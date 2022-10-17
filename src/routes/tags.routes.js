import { Router } from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import tagsController from "../controllers/TagsController";

const tagsRoutes = Router();

tagsRoutes.get("/", ensureAuthenticated, tagsController.index);

export default tagsRoutes;
