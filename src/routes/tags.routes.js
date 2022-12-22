const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const tagsController = require("../controllers/TagsController");

const tagsRoutes = Router();

tagsRoutes.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRoutes;
