import axios from "axios";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const kartoffelUsersHandler = async (request: Request, response: Response) => {
    const search = request.params.search;
    const entities = (await axios.get("http://kartoffel.branch-yesodot.org/api/entities/search?fullName=" + search))
        .data;
    const fullNames = entities.map((entity) => entity.firstName + ' ' + entity.lastName);

    response.status(StatusCodes.OK).send(fullNames);
};

export { kartoffelUsersHandler };
