import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
    appendOrder,
    changeOrder,
    deleteOrder,
    findAllOrders,
    findDailyMostProfitableItem,
    findHighestAndLowestProfitMarginItems,
    findMonthlyRevenue,
    findMostProfitableSupplier,
    findOrderByID,
    findTotalSpentOnSuppliers,
    findWeeklyMostProfitableCategory,
} from "./order.manager";

const addOrderHandler = async (request: Request, response: Response) => {
    const newOrder = request.body;
    const order = await appendOrder(newOrder);

    response.status(StatusCodes.CREATED).send(order);
};

const removeOrderHandler = async (request: Request, response: Response) => {
    const deletedItem = await deleteOrder(request.params.id);

    response.status(StatusCodes.OK).send(deletedItem);
};

const changeOrderHandler = async (request: Request, response: Response) => {
    const updatedItem = await changeOrder(request.params.id, request.body);

    response.status(StatusCodes.OK).send(updatedItem);
};

const getOrderHandler = async (request: Request, response: Response) => {
    const order = await findOrderByID(request.params.id);

    response.status(StatusCodes.OK).send(order);
};

const getAllOrdersHandler = async (_request: Request, response: Response) => {
    const orders = await findAllOrders();

    response.status(StatusCodes.OK).send(orders);
};

const getMonthlyRevenueHandler = async (_request: Request, response: Response) => {
    const revenue = await findMonthlyRevenue();

    response.status(StatusCodes.OK).send(revenue);
};

const getWeeklyMostProfitableCategoryHandler = async (_request: Request, response: Response) => {
    const category = await findWeeklyMostProfitableCategory();

    response.status(StatusCodes.OK).send(category);
};

const getDailyMostProfitableItemHandler = async (_request: Request, response: Response) => {
    const itemName = await findDailyMostProfitableItem();

    response.status(StatusCodes.OK).send(itemName);
};

const getHighestAndLowestProfitMarginItemsHandler = async (_request: Request, response: Response) => {
    const items = await findHighestAndLowestProfitMarginItems();

    response.status(StatusCodes.OK).send(items);
};

const getMostProfitableSupplierHandler = async (_request: Request, response: Response) => {
    const supplier = await findMostProfitableSupplier();

    response.status(StatusCodes.OK).send(supplier);
};

const getTotalSpentOnSuppliers = async (_request: Request, response: Response) => {
    const suppliersTotalSpent = await findTotalSpentOnSuppliers();

    response.status(StatusCodes.OK).send(suppliersTotalSpent);
};

export {
    addOrderHandler,
    changeOrderHandler,
    getAllOrdersHandler,
    getDailyMostProfitableItemHandler,
    getHighestAndLowestProfitMarginItemsHandler,
    getMonthlyRevenueHandler,
    getMostProfitableSupplierHandler,
    getOrderHandler,
    getTotalSpentOnSuppliers,
    getWeeklyMostProfitableCategoryHandler,
    removeOrderHandler,
};
