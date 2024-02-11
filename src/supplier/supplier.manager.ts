import { BadRequestExeption, ItemNotInSupplierExeption } from "../exceptions/HttpException";
import { deleteItemByName, findItem } from "../item/item.manager";
import { updateItemPriceByPrecentage } from "../item/item.repository";
import { INewSupplier, ISupplier } from "./supplier.interface";
import {
    addSupplier,
    appendSupplierItem,
    getAllSuppliers,
    getSupplier,
    removeSupplier,
    removeSupplierItem,
    updateSupplier,
    updateSupplierItem,
} from "./supplier.repository";

const appendSupplier = (supplier: INewSupplier) => {
    return addSupplier(supplier);
};

const deleteSupplier = async (id: string) => {
    const supplier = await findSupplierByID(id);

    await Promise.all(
        supplier.items.map(async (item) => {
            try {
                return await deleteItemByName(item.itemName);
            } catch {
                return;
            }
        })
    );

    return removeSupplier(id);
};

const changeSupplier = async (id: string, supplier: Partial<ISupplier>) => {
    const ITEM_PRICE_TO_SUPPLIER_PRICE_RATIO = 1.3;

    if (supplier.items?.length) {
        for (const item of supplier.items) {
            const fullItem = await findItem(item.itemName);

            if (fullItem.price < ITEM_PRICE_TO_SUPPLIER_PRICE_RATIO * item.supplierPrice) {
                throw new BadRequestExeption("Item price has to be 30% higher than suppliers price");
            }
        }
    }

    return updateSupplier(id, supplier);
};

const findSupplierByID = (id: string): Promise<ISupplier> => {
    return getSupplier(id);
};

const findAllSuppliers = (): Promise<ISupplier[]> => {
    return getAllSuppliers();
};

const getSupplierPrice = async (supplierId: string, itemName: string): Promise<number> => {
    const supplier = await getSupplier(supplierId);
    const item = supplier.items ? supplier.items.find((currentItem) => currentItem.itemName === itemName) : undefined;

    if (!item) {
        throw new ItemNotInSupplierExeption();
    }

    return item.supplierPrice;
};

const deleteSupplierItem = async (supplierId: string, itemName: string) => {
    const supplier = await removeSupplierItem(supplierId, itemName);

    if (!supplier.items.find((item) => item.itemName === itemName)) {
        throw new ItemNotInSupplierExeption();
    } else {
        try {
            await deleteItemByName(itemName);
        } catch {}
    }

    return supplier;
};

const addSupplierItem = (supplierId: string, item: { itemName: string; supplierPrice: string }) => {
    return appendSupplierItem(supplierId, item);
};

const changeSupplierItem = async (supplierId: string, itemName: string, newPrice: number) => {
    const supplier = await updateSupplierItem(supplierId, itemName, newPrice);
    const supplierOldPrice = supplier.items.find((item) => item.itemName === itemName)?.supplierPrice;

    if (!supplierOldPrice) {
        throw new ItemNotInSupplierExeption();
    } else {
        const changePrecentage = parseFloat((newPrice / supplierOldPrice).toFixed(3));

        return updateItemPriceByPrecentage(itemName, changePrecentage);
    }
};

export {
    addSupplierItem,
    appendSupplier,
    changeSupplier,
    changeSupplierItem,
    deleteSupplier,
    deleteSupplierItem,
    findAllSuppliers,
    findSupplierByID,
    getSupplierPrice,
};
