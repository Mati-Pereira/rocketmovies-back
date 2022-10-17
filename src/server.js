import "express-async-errors";
import express from "express";
import routes from "./routes";
import AppError from "./utils/AppError";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(routes);
app.use(cors());
app.disable("x-powered-by");

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
      .json({ status: "error", message: "internal server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server Rodando na Porta: ${PORT}`);
});
