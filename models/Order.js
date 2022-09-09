import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    transactionId: { type: String },
    paymentInfo: { type: String, default: "" },
    products: { type: Object, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "initiated", required: true },
    deliveryStatus: { type: String, default: "unshipped", required: true },

}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);