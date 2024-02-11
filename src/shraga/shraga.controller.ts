import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../utils/config";
import { parseJWT } from "./jwt";

const authLoginHandler = (request: Request, response: Response) => {
    console.log("Entered: GET /auth/login");

    let redirectUrl =
        config.shragaUrl +
        `/setCallback/${encodeURIComponent(config.callbackURL)}` +
        `?SignInSecret=${encodeURIComponent(config.secret)}` +
        `&useEnrichId=${config.useEnrichId}` +
        `&RelayState=${request.query.relayState || "/"}`;

    response.redirect(redirectUrl);
};

const authCallbackHandler = (request: Request, response: Response) => {
    console.log("Entered: GET /auth/callback");

    const token = String(request.query.jwt);

    try {
        const payload = parseJWT(token);
        response.cookie("access-token", token);
        response.redirect(payload.RelayState || "/");
    } catch (error) {
        response.status(StatusCodes.FORBIDDEN).send("Unauthorized");
    }
};

const getSelfHandler = (request: Request, response: Response) => {
    const token = request.cookies["access-token"];
    const payload = parseJWT(token);
    const user = {
        name: payload.name,
        email: payload.email,
    };

    response.status(StatusCodes.OK).send(user);
};

export { authCallbackHandler, authLoginHandler, getSelfHandler };
