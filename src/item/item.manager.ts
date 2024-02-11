import { ObjectId } from "mongoose";
import { BadRequestExeption, ItemNotFoundExeption } from "../exceptions/HttpException";
import { findSupplierByID, getSupplierPrice } from "../supplier/supplier.manager";
import { IItem, INewItem } from "./item.interface";
import {
    addItem,
    getAllItems,
    getItem,
    getItemById,
    removeItem,
    removeItemByName,
    updateItem,
    updateItemByName,
    getItemsBySearch
} from "./item.repository";

const appendItem = async (item: INewItem) => {
    const ITEM_PRICE_TO_SUPPLIER_PRICE_RATIO = 1.3;
    const supplierPrice = await getSupplierPrice(item.supplier.toString(), item.name);

    if (!supplierPrice) {
        throw new ItemNotFoundExeption();
    } else if (item.price < ITEM_PRICE_TO_SUPPLIER_PRICE_RATIO * supplierPrice) {
        throw new BadRequestExeption("Item price has to be 30% higher than suppliers price");
    }

    return addItem(item);
};

const deleteItem = (id: string) => {
    return removeItem(id);
};

const deleteItemByName = (name: string) => {
    return removeItemByName(name);
};

const changeItem = (id: string, item: Partial<IItem>) => {
    return updateItem(id, item);
};

const changeItemByName = (name: string, item: Partial<IItem>) => {
    return updateItemByName(name, item);
};

const findItemByID = (id: string): Promise<IItem> => {
    return getItemById(id);
};

const findItem = (name: string): Promise<IItem> => {
    return getItem(name);
};

const findAllItems = (): Promise<IItem[]> => {
    return getAllItems();
};

const updateItemProfit = async (item: {
    itemName: string;
    itemQuantity: number;
    itemPrice: number;
    itemCategory: string;
    itemProfit: number;
    itemSupplier: ObjectId;
}) => {
    const fullItem = await getItem(item.itemName);
    const supplier = await findSupplierByID(fullItem.supplier.toString());
    const supplierPrice = supplier.items.find((currentItem) => currentItem.itemName === item.itemName)?.supplierPrice;
    item.itemSupplier = supplier._id;
    item.itemProfit = supplierPrice ? (fullItem.price - supplierPrice) * item.itemQuantity : 0;

    return item;
};

const findItemsBySearch = (search: string) => {
    return getItemsBySearch(search);
};

export {
    appendItem,
    changeItem,
    changeItemByName,
    deleteItem,
    deleteItemByName,
    findAllItems,
    findItem,
    findItemByID,
    findItemsBySearch,
    updateItemProfit,
};
