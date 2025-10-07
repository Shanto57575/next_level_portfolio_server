import express from "express";
import cors from "cors";
import { router } from "./app/router/routes";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { envVariables } from "./config/envConfig";

const app = express();

interface CustomCorsOptions {
  origin: string;
  credentials?: boolean;
}

const corsOptions: CustomCorsOptions = {
  origin: envVariables.FRONTEND_URL as string,
  // origin: "http://localhost:3000",
  credentials: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(cors(corsOptions as any));

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
