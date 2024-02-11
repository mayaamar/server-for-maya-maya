import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
    addSupplierItem,
    appendSupplier,
    changeSupplier,
    changeSupplierItem,
    deleteSupplier,
    deleteSupplierItem,
    findAllSuppliers,
    findSupplierByID,
} from "./supplier.manager";

const addSupplierHandler = async (request: Request, response: Response) => {
    const newSupplier = request.body;
    const supplier = await appendSupplier(newSupplier);

    response.status(StatusCodes.CREATED).send(supplier);
};

const removeSupplierHandler = async (request: Request, response: Response) => {
    const deletedSupplier = await deleteSupplier(request.params.id);

    response.status(StatusCodes.OK).send(deletedSupplier);
};

const changeSupplierHandler = async (request: Request, response: Response) => {
    const updatedSupplier = await changeSupplier(request.params.id, request.body);

    response.status(StatusCodes.OK).send(updatedSupplier);
};

const getSupplierHandler = async (request: Request, response: Response) => {
    const item = await findSupplierByID(request.params.id);

    response.status(StatusCodes.OK).send(item);
};

const getAllSuppliersHandler = async (_request: Request, response: Response) => {
    const items = await findAllSuppliers();

    response.status(StatusCodes.OK).send(items);
};

const deleteSupplierItemHandler = async (request: Request, response: Response) => {
    const deletedSupplierItem = await deleteSupplierItem(request.params.id, request.params.itemName);

    response.status(StatusCodes.OK).send(deletedSupplierItem);
};

const addSupplierItemHandler = async (request: Request, response: Response) => {
    const supplierItem = await addSupplierItem(request.params.id, request.body);

    response.status(StatusCodes.OK).send(supplierItem);
};

const changeSupplierItemHandler = async (request: Request, response: Response) => {
    const supplierItem = await changeSupplierItem(
        request.params.id,
        request.params.name,
        parseInt(request.params.newPrice)
    );

    response.status(StatusCodes.OK).send(supplierItem);
};

export {
    addSupplierHandler,
    addSupplierItemHandler,
    changeSupplierHandler,
    changeSupplierItemHandler,
    deleteSupplierItemHandler,
    getAllSuppliersHandler,
    getSupplierHandler,
    removeSupplierHandler,
};
