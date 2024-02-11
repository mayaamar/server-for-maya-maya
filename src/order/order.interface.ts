import { ObjectId } from "mongoose";

export interface IOrder {
    _id: ObjectId;
    user?: number;
    items: {
        itemName: string;
        itemPrice: number;
        itemCategory: string;
        itemQuantity: number;
        itemProfit: number;
        itemSupplier: ObjectId;
    }[];
    address: string;
    orderDate: Date;
    shopProfit?: number;
}

export type INewOrder = Omit<
    IOrder,
    "_id" | "items.itemPrice" | "items.itemCategory" | "items.itemProfit" | "items.itemSupplierId"
>;
