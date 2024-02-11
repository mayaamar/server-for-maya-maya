import { ItemNotFoundExeption } from "../exceptions/HttpException";
import { IItem, INewItem } from "./item.interface";
import itemModel from "./item.model";

const addItem = (item: INewItem) => {
    return itemModel.create(item);
};

const removeItem = (id: string) => {
    return itemModel.findByIdAndDelete(id).exec();
};

const removeItemByName = (name: string) => {
    return itemModel.findOneAndDelete({ name: name }).orFail(new ItemNotFoundExeption()).exec();
};

const getItemById = (id: string): Promise<IItem> => {
    return itemModel.findById(id).orFail(new ItemNotFoundExeption()).exec();
};

const getItem = (name: string): Promise<IItem> => {
    return itemModel.findOne({ name: name }).orFail(new ItemNotFoundExeption()).exec();
};

const getAllItems = async (): Promise<IItem[]> => {
    return itemModel.find().populate("supplier").exec();
};

const updateItem = (id: string, item: Partial<IItem>) => {
    return itemModel.findByIdAndUpdate(id, item).exec();
};

const updateItemByName = (name: string, item: Partial<IItem>) => {
    return itemModel.findOneAndUpdate({ name: name }, item).exec();
};

const updateItemPriceByPrecentage = (name: string, precentage: number) => {
    return itemModel.findOneAndUpdate({ name: name }, { $mul: { price: precentage } }).exec();
};

const getItemsBySearch = (search: string) => {
    if (!search) return getAllItems();
    return itemModel.find({ name: { $regex: search, $options: 'i' } });
};

export {
    addItem,
    getAllItems,
    getItem,
    getItemById,
    getItemsBySearch,
    removeItem,
    removeItemByName,
    updateItem,
    updateItemByName,
    updateItemPriceByPrecentage
};

