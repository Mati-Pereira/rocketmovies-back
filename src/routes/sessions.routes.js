const { Router } = require("express");
const sessionsController = require("../controllers/SessionsController");

const sessionsRoutes = Router();

sessionsRoutes.post("/", sessionsController.create);

module.exports = sessionsRoutes;
