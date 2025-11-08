import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouters from "./routes/user-routes";
import authRouters from "./routes/auth-routes";
import { errorMiddleware } from "./middlewares/error";

const app: Application = express();

const allowedOrigins = ["https://localhost:5173"];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/users", userRouters);
app.use("/api/auth", authRouters);

app.use(errorMiddleware);

export default app;
