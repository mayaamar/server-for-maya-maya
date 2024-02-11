import Joi from "joi";

export const NewItemValidationSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(0),
    stock: Joi.number().required().min(0),
    category: Joi.string().required(),
    supplier: Joi.string().required(),
});

export const IdValidationSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
});

export const NameValidationSchema = Joi.object({
    name: Joi.string().required(),
});

export const ChangeItemValidationSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string(),
    price: Joi.number().min(0),
    stock: Joi.number().min(0),
    category: Joi.string(),
    supplier: Joi.string(),
});

export const NewOrderValidationSchema = Joi.object({
    user: Joi.number(),
    items: Joi.array()
        .items(
            Joi.object().keys({
                itemName: Joi.string().required(),
                itemQuantity: Joi.number().required(),
            })
        )
        .unique()
        .required(),
    address: Joi.string().required(),
    orderDate: Joi.date().required(),
});

export const ChangeOrderValidationSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    items: Joi.array()
        .items(
            Joi.object().keys({
                itemName: Joi.string().required(),
                itemQuantity: Joi.number().required(),
            })
        )
        .unique(),
    address: Joi.string(),
    orderDate: Joi.date(),
});

export const NewSupplierValidationSchema = Joi.object({
    name: Joi.string().required(),
    items: Joi.array()
        .items(
            Joi.object().keys({
                itemName: Joi.string().required(),
                supplierPrice: Joi.number().required(),
            })
        )
        .unique(),
});

export const ChangeSupplierValidationSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    items: Joi.array()
        .items(
            Joi.object().keys({
                itemName: Joi.string().required(),
                supplierPrice: Joi.number().required(),
            })
        )
        .unique(),
});

export const NewSupplierItemValidationSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    itemName: Joi.string().required(),
    supplierPrice: Joi.number().min(0).required(),
});

export const ChangeSupplierItemValidationSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().required(),
    newPrice: Joi.number().required(),
});

export const DeleteSupplierItemValidationSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    itemName: Joi.string().required(),
});

export const SearchValidationSchema = Joi.object({
    search: Joi.string().required(),
});
