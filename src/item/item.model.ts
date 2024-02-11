import mongoose, { Schema } from "mongoose";
import { IItem } from "./item.interface";

const ItemSchema = new Schema<IItem>({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
});

export default mongoose.model("Item", ItemSchema);
