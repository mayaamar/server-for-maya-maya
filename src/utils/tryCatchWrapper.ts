import { NextFunction, Request, Response } from "express";

const wrapper = (func: (request: Request, response: Response) => Promise<void>) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            await func(request, response);
        } catch (err) {
            next(err);
        }
    };
};

export default wrapper;
