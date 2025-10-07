import express from "express";
import cors, { CorsOptions } from "cors";
import { router } from "./app/router/routes";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { envVariables } from "./config/envConfig";

const app = express();

const corsOptions: CorsOptions = {
  origin: envVariables.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send({ message: "portfolio server api is running fine" });
});

// routes
app.use("/api/v1", router);

// middlewares
app.use(globalErrorHandler);
app.use(notFound);

export default app;
