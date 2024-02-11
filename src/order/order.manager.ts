import { BadRequestExeption } from "../exceptions/HttpException";
import { changeItemByName, findItem, updateItemProfit } from "../item/item.manager";
import { findSupplierByID } from "../supplier/supplier.manager";
import { INewOrder, IOrder } from "./order.interface";
import {
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
} from "./order.repository";

const appendOrder = async (order: INewOrder) => {
    validateNewOrder(order);
    const newStocks = await calculateItemsNewStocksAfterOrder(order);

    await Promise.all(
        newStocks.map(async (newStock) => {
            return changeItemByName(newStock.itemName, { stock: newStock.newStock });
        })
    );

    return updateOrderItemsAndAppendOrder(order);
};

const updateOrderItemsAndAppendOrder = async (order: INewOrder) => {
    return Promise.all(
        order.items.map(async (item) => {
            const updatedItem = await updateItemProfit(item);
            item.itemSupplier = updatedItem.itemSupplier;
            item.itemProfit = updatedItem.itemProfit;

            return updatedItem.itemProfit;
        })
    ).then((values) => {
        order.shopProfit = values.reduce((sum, current) => sum + current, 0);

        return addOrder(order);
    });
};

const calculateItemsNewStocksAfterOrder = (order: INewOrder) => {
    return Promise.all(
        order.items.map(async (item) => {
            const fullItem = await findItem(item.itemName);
            const newStock = fullItem.stock - item.itemQuantity;

            if (newStock < 0) {
                throw new BadRequestExeption("Too Many Items Not Enough In Stock");
            }

            item.itemPrice = fullItem.price;
            item.itemCategory = fullItem.category;

            return { itemName: fullItem.name, newStock: newStock };
        })
    );
};

const validateNewOrder = (order: INewOrder) => {
    const MAX_UNIQUE_ITEMS = 10;
    const MAX_ITEMS = 50;

    if (order.items.length > MAX_UNIQUE_ITEMS) {
        throw new BadRequestExeption("Too Many Unique Items");
    } else if (order.items.reduce((sum, current) => sum + current.itemQuantity, 0) > MAX_ITEMS) {
        throw new BadRequestExeption("Too Many Items");
    }
};

const deleteOrder = (id: string) => {
    return removeOrder(id);
};

const changeOrder = (id: string, order: Partial<IOrder>) => {
    return updateOrder(id, order);
};

const findOrderByID = (id: string): Promise<IOrder> => {
    return getOrder(id);
};

const findAllOrders = (): Promise<IOrder[]> => {
    return getAllOrders();
};

const findMonthlyRevenue = async () => {
    const result = await getMonthlyRevenue();

    return result[0] ? String(result[0].sum) : [];
};

const findWeeklyMostProfitableCategory = async () => {
    const result = await getWeeklyMostProfitableCategory();

    return result[0] ? String(result[0]._id) : [];
};

const findDailyMostProfitableItem = async () => {
    const result = await getDailyMostProfitableItem();

    return result[0] ? String(result[0]._id) : [];
};

const findHighestAndLowestProfitMarginItems = async () => {
    const result = await getHighestAndLowestProfitMarginItems();

    return { Highest: result[0]._id, Lowest: result[result.length - 1]._id };
};

const findMostProfitableSupplier = async () => {
    const result = await getMostProfitableSupplier();

    return result[0] ? findSupplierByID(result[0]._id) : [];
};

const findTotalSpentOnSuppliers = async () => {
    const suppliersTotalSpent = await getTotalSpentOnSuppliers();
    let suppliersFormated: { name: string; _id: string; total: number }[] = [];

    for (let supplierSpent of suppliersTotalSpent) {
        let sum = 0;

        if (supplierSpent._id.length) {
            for (const subItem of supplierSpent._id[0].items) {
                const item = await findItem(subItem.itemName).catch(() => {});
                sum += item ? item.stock * subItem.supplierPrice : 0;
            }

            supplierSpent.name = supplierSpent._id[0].name;
            supplierSpent._id = supplierSpent._id[0]._id;
            supplierSpent.total = supplierSpent.totalSpentOrders + sum;
            delete supplierSpent.totalSpentOrders;

            suppliersFormated.push(supplierSpent);
        }
    }

    return suppliersFormated.sort((a, b) => a.total - b.total);
};

export {
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
};
