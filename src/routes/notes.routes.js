import { Router } from "express";

import NotesController from "../controllers/NotesController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const notesRoutes = Router();
const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated);

notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);
notesRoutes.get("/", notesController.index);

export default notesRoutes;
