import { Router } from "express";

import sessionsController from "../controllers/SessionsController";

const sessionsRoutes = Router();

sessionsRoutes.post("/", sessionsController.create);

export default sessionsRoutes;
