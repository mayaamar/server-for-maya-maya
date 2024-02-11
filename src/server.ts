import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import errorMiddleware from "./middlewares/error.middleware";
import router from "./router";

const app: Application = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);
app.use(errorMiddleware);

export default app;
