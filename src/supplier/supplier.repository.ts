import { SupplierNotFoundExeption } from "../exceptions/HttpException";
import { INewSupplier, ISupplier } from "./supplier.interface";
import supplierModel from "./supplier.model";

const addSupplier = (supplier: INewSupplier) => {
    return supplierModel.create(supplier);
};

const removeSupplier = (id: string) => {
    return supplierModel.findByIdAndDelete(id).exec();
};

const getSupplier = (id: string): Promise<ISupplier> => {
    return supplierModel.findById(id).orFail(new SupplierNotFoundExeption()).exec();
};

const getAllSuppliers = (): Promise<ISupplier[]> => {
    return supplierModel.find().exec();
};

const updateSupplier = (id: string, supplier: Partial<ISupplier>) => {
    return supplierModel.findByIdAndUpdate(id, supplier).exec();
};

const appendSupplierItem = (supplierId: string, item: { itemName: string; supplierPrice: string }) => {
    return supplierModel
        .findByIdAndUpdate(supplierId, { $push: { items: item } })
        .orFail(new SupplierNotFoundExeption()).exec();
};

const removeSupplierItem = (supplierId: string, itemName: string) => {
    return supplierModel
        .findByIdAndUpdate(supplierId, { $pull: { items: { itemName: itemName } } })
        .orFail(new SupplierNotFoundExeption()).exec();
};

const updateSupplierItem = (supplierId: string, itemName: string, newPrice: number) => {
    return supplierModel
        .findOneAndUpdate(
            { _id: supplierId, items: { $elemMatch: { itemName: itemName } } },
            { $set: { "items.$.supplierPrice": newPrice } }
        )
        .orFail(new SupplierNotFoundExeption()).exec();
};

export {
    addSupplier,
    appendSupplierItem,
    getAllSuppliers,
    getSupplier,
    removeSupplier,
    removeSupplierItem,
    updateSupplier,
    updateSupplierItem,
};
