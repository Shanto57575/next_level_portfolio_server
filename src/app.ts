import express from "express";
import cors from "cors";
import { router } from "./app/router/routes";
import { envVariables } from "./config/envConfig";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  cors({
    origin: envVariables.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send({ message: "portfolio server api is running fine" });
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
