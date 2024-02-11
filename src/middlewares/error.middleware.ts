import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import { StatusCodes } from "http-status-codes";

const errorMiddleware = (error: HttpException, _request: Request, response: Response, _next: NextFunction) => {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || "Something went wrong";
    response.status(status).send({
        message,
        status,
    });
};

export default errorMiddleware;
