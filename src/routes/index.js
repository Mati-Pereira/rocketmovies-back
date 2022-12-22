import { Router } from "express";

import usersRouter from "./users.routes";
import notesRouter from "./notes.routes";
import tagsRouter from "./tags.routes";
import sessionsRouter from "./sessions.routes";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/notes", notesRouter);
routes.use("/tags", tagsRouter);
routes.use("/sessions", sessionsRouter);

export default routes;
