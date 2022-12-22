require("express-async-errors");
require("dotenv/config");
const express = require("express");
const routes = require("./routes");
const AppError = require("./utils/AppError");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.json({
    message: "O server está rodando",
  });
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  } else {
    return res
      .status(500)
      .json({ status: "error", message: "Erro interno no servidor" });
  }
});

app.listen(3333, () => {
  console.log(`Server Rodando na Porta: 3333`);
});
