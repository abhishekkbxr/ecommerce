import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    products: [{
        productId: { type: String },
        quantity: { type: Number, default: 1 }
    }],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Panding", required: true },

}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);