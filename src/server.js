require("express-async-errors");
const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = 3333;
const AppError = require("./utils/AppError");

app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  } else {
    return res
      .status(500)
      .json({ status: "error", message: "internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server Rodando na Porta: ${PORT}`);
});
