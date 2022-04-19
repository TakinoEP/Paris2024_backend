const mainRouter = require("express").Router();
const adminRouter = require("./admins.routes");
const disciplineRouter = require("./disciplines.routes");
const cocoricoRouter = require("./cocorico.routes");
const authRouter = require("./auth.routes");

mainRouter.use("/admins", adminRouter);
mainRouter.use("/discipline", disciplineRouter);
mainRouter.use("/cocorico", cocoricoRouter);
mainRouter.use("/login", authRouter);

module.exports = mainRouter;
