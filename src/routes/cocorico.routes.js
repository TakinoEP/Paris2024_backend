const cocoricoRouter = require("express").Router();

const { cocoricoControllers, authControllers } = require("../controllers");

cocoricoRouter.get("/", cocoricoControllers.getAllCocorico);
cocoricoRouter.get("/:id", cocoricoControllers.getOneCocoricoById);

cocoricoRouter.put(
  "/:id",
  cocoricoControllers.updateOneCocoricoById,
  cocoricoControllers.getOneCocoricoById
);

cocoricoRouter.post(
  "/",
  cocoricoControllers.createOneMoreCocorico,
  cocoricoControllers.getOneCocoricoById,
);

cocoricoRouter.delete("/:id", cocoricoControllers.deleteOneCocorico);

module.exports = cocoricoRouter;
