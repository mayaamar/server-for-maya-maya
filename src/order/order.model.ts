import mongoose, { Schema } from "mongoose";
import { IOrder } from "./order.interface";

const OrderSchema = new Schema<IOrder>({
    user: { type: Number },
    items: [
        {
            itemName: {
                type: String,
                required: true,
            },
            itemQuantity: {
                type: Number,
                required: true,
            },
            itemPrice: {
                type: Number,
                required: true,
            },
            itemCategory: {
                type: String,
                required: true,
            },
            itemProfit: {
                type: Number,
                required: true,
            },
            itemSupplier: {
                type: Schema.Types.ObjectId,
                required: true,
            },
        },
    ],
    address: { type: String, required: true },
    orderDate: { type: Date, required: true },
    shopProfit: { type: Number },
});

OrderSchema.index({ shopProfit: 1 });

export default mongoose.model("Order", OrderSchema);
