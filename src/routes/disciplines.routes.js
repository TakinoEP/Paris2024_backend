const disciplineRouter = require("express").Router();

const { disciplineControllers, authControllers } = require("../controllers");

disciplineRouter.get("/", disciplineControllers.getAllDisciplines);
disciplineRouter.get("/:id", disciplineControllers.getOneDisciplineById);
disciplineRouter.get("/name/:royaume_name", disciplineControllers.getDisciplineByName);

disciplineRouter.post("/", authControllers.verifyToken, disciplineControllers.createOneDiscipline, disciplineControllers.getOneDisciplineById);

disciplineRouter.put("/:id", authControllers.verifyToken, disciplineControllers.updateOneDisciplineById, disciplineControllers.getOneDisciplineById);

disciplineRouter.delete("/:id", authControllers.verifyToken, disciplineControllers.deleteOneDiscipline);

module.exports = disciplineRouter;
