import { NextFunction, Request, Response } from "express";
import { JoiException } from "../exceptions/HttpException";
import Joi from "joi";

const joiValidationMiddleware = (joiSchema: Joi.ObjectSchema) => {
    const joiHandler = (request: Request, _response: Response, next: NextFunction) => {
        const result = joiSchema.validate({ ...request.body, ...request.params });

        if (result.error) {
            next(new JoiException(result.error.message));
        }

        next();
    };

    return joiHandler;
};

export default joiValidationMiddleware;
