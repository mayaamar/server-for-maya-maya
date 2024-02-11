import { ObjectId } from "mongoose";

export interface ISupplier {
    _id: ObjectId;
    name: string;
    items: { itemName: string; supplierPrice: number }[];
}

export type INewSupplier = Omit<ISupplier, '_id'>;