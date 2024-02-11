import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
    appendItem,
    changeItem,
    deleteItem,
    findAllItems,
    findItem,
    findItemByID,
    findItemsBySearch,
} from "./item.manager";

const addItemHandler = async (request: Request, response: Response) => {
    const newItem = request.body;
    const item = await appendItem(newItem);

    response.status(StatusCodes.CREATED).send(item);
};

const removeItemHandler = async (request: Request, response: Response) => {
    const deletedItem = await deleteItem(request.params.id);

    response.status(StatusCodes.OK).send(deletedItem);
};

const changeItemHandler = async (request: Request, response: Response) => {
    const updatedItem = await changeItem(request.params.id, request.body);

    response.status(StatusCodes.OK).send(updatedItem);
};

const getItemHandler = async (request: Request, response: Response) => {
    const item = await findItem(request.params.name);

    response.status(StatusCodes.OK).send(item);
};

const getItemByIdHandler = async (request: Request, response: Response) => {
    const item = await findItemByID(request.params.id);

    response.status(StatusCodes.OK).send(item);
};

const getAllItemsHandler = async (_request: Request, response: Response) => {
    const items = await findAllItems();

    response.status(StatusCodes.OK).send(items);
};

const getItemsBySearchHandler = async (request: Request, response: Response) => {
    const items = await findItemsBySearch(request.params.search);

    response.status(StatusCodes.OK).send(items);
};

export {
    addItemHandler,
    changeItemHandler,
    getAllItemsHandler,
    getItemByIdHandler,
    getItemHandler,
    getItemsBySearchHandler,
    removeItemHandler,
};
