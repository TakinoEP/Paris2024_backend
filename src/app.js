require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mainRouter = require("./routes");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_ORIGIN
  })
)

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello Franchouillard !" });
});

app.use("/api", mainRouter);

module.exports = app;
