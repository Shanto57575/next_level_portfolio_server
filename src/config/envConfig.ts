import dotenv from "dotenv";

dotenv.config();

export const envVariables = {
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
