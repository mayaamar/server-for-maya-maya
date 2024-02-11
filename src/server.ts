import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import errorMiddleware from "./middlewares/error.middleware";
import shragaMiddleware from "./middlewares/shraga.middleware";
import router from "./router";

const app: Application = express();

app.use(
    cors({
        origin: "http://10.100.11.131:8080",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/items", shragaMiddleware);
app.use("/suppliers", shragaMiddleware);
app.use("/orders", shragaMiddleware);
app.use("/self", shragaMiddleware);
app.use("/kartoffel", shragaMiddleware);
app.use(router);
app.use(errorMiddleware);


export default app;
