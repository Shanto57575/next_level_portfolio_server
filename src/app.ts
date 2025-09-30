import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./app/router/routes";
import { envVariables } from "./config/envConfig";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

export default app;
