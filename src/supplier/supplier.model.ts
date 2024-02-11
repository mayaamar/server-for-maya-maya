import mongoose, { Schema } from "mongoose";
import { ISupplier } from "./supplier.interface";

const SupplierSchema = new Schema<ISupplier>({
    name: { type: String, required: true },
    items: {
        type: [
            {
                itemName: {
                    type: String,
                },
                supplierPrice: {
                    type: Number,
                },
            },
        ],
    },
});

export default mongoose.model("Supplier", SupplierSchema);
