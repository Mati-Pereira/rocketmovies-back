import { Router } from "express";

import notesController from "../controllers/NotesController";
import tagsController from "../controllers/TagsController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const notesRoutes = Router();

notesRoutes.use(ensureAuthenticated);

notesRoutes.post("/", notesController.create, tagsController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);
notesRoutes.get("/", notesController.index);

export default notesRoutes;
