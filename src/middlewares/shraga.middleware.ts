import { NextFunction, Response } from "express";
import { ForbiddenException } from "../exceptions/HttpException";
import { parseJWT } from "../shraga/jwt";

const shragaMiddleware = (request, _response: Response, next: NextFunction) => {
    console.log("Entered auth middleware");

    const token = request.cookies["access-token"];

    try {
        request.user = parseJWT(token);
        next();
    } catch (error) {
        throw new ForbiddenException("Access Denied");
    }
};

export default shragaMiddleware;
