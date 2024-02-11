import { ObjectId } from "mongoose";
import { ISupplier } from "../supplier/supplier.interface";

export interface IItem {
    _id: ObjectId;
    name: string;
    price: number;
    stock: number;
    category: string;
    supplier: ISupplier;
}

export type INewItem = Omit<IItem, "_id">;
