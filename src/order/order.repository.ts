import { OrderNotFoundExeption } from "../exceptions/HttpException";
import { INewOrder, IOrder } from "./order.interface";
import orderModel from "./order.model";

const addOrder = (order: INewOrder) => {
    return orderModel.create(order);
};

const removeOrder = (id: string) => {
    return orderModel.findByIdAndDelete(id).exec();
};

const getOrder = (id: string): Promise<IOrder> => {
    return orderModel.findById(id).orFail(new OrderNotFoundExeption()).exec();
};

const getAllOrders = (): Promise<IOrder[]> => {
    return orderModel.find().exec();
};

const updateOrder = (id: string, order: Partial<IOrder>) => {
    return orderModel.findByIdAndUpdate(id, order).exec();
};

const getMonthlyRevenue = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);

    return orderModel.aggregate([
        {
            $match: {
                orderDate: {
                    $gt: date,
                },
            },
        },
        {
            $group: {
                _id: 0,
                sum: {
                    $sum: "$shopProfit",
                },
            },
        },
    ]);
};

const getWeeklyMostProfitableCategory = () => {
    const DAYS_IN_WEEK = 7;

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - DAYS_IN_WEEK);

    return orderModel.aggregate([
        { $unwind: "$items" },
        {
            $match: {
                orderDate: {
                    $gt: lastWeek,
                },
            },
        },
        {
            $group: {
                _id: "$items.itemCategory",
                total: { $sum: "$items.itemProfit" },
            },
        },
        {
            $sort: { total: -1 },
        },
        {
            $limit: 1,
        },
    ]);
};

const getDailyMostProfitableItem = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return orderModel.aggregate([
        { $unwind: "$items" },
        {
            $match: {
                orderDate: {
                    $gt: yesterday,
                },
            },
        },
        {
            $group: {
                _id: "$items.itemName",
                total: { $sum: "$items.itemProfit" },
            },
        },
        {
            $sort: { total: -1 },
        },
        {
            $limit: 1,
        },
    ]);
};

const getHighestAndLowestProfitMarginItems = () => {
    return orderModel.aggregate([
        { $unwind: "$items" },
        {
            $group: {
                _id: "$items.itemName",
                total: { $sum: "$items.itemProfit" },
            },
        },
        {
            $sort: { total: -1 },
        },
    ]);
};

const getMostProfitableSupplier = () => {
    return orderModel.aggregate([
        { $unwind: "$items" },
        {
            $group: {
                _id: "$items.itemSupplier",
                total: { $sum: "$items.itemProfit" },
            },
        },
        {
            $sort: { total: -1 },
        },
        {
            $limit: 1,
        },
    ]);
};

const getTotalSpentOnSuppliers = () => {
    return orderModel.aggregate([
        {
            $unwind: {
                path: "$items",
            },
        },
        {
            $lookup: {
                from: "items",
                localField: "items.itemName",
                foreignField: "name",
                as: "items.originalItem",
            },
        },
        {
            $lookup: {
                from: "suppliers",
                localField: "items.itemSupplier",
                foreignField: "_id",
                as: "items.itemSupplier",
            },
        },
        {
            $group: {
                _id: "$items.itemSupplier",
                totalSpentOrders: {
                    $sum: {
                        $subtract: [
                            {
                                $multiply: ["$items.itemPrice", "$items.itemQuantity"],
                            },
                            "$items.itemProfit",
                        ],
                    },
                },
            },
        },
    ]);
};

export {
    addOrder,
    getAllOrders,
    getDailyMostProfitableItem,
    getHighestAndLowestProfitMarginItems,
    getMonthlyRevenue,
    getMostProfitableSupplier,
    getOrder,
    getTotalSpentOnSuppliers,
    getWeeklyMostProfitableCategory,
    removeOrder,
    updateOrder,
};
