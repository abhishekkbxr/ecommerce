import Payment from "../../../models/Payment";
import connectDb from "../../../middleware/mongoose";
import Order from "../../../models/Order";
import { verify } from "jsonwebtoken";
import Product from "../../../models/Product";
const crypto = require("crypto");

const handler = async (req, res) => {
    let order;

    if (req.method === "POST") {
        // verification of successfull payment and updating the payment status to paid
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

        const body = razorpay_order_id + "|" + razorpay_payment_id

        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {

            await Payment.create({ razorpay_payment_id, razorpay_order_id, razorpay_signature })
            order = await Order.findOneAndUpdate({ orderId: razorpay_order_id }, { status: "paid", paymentInfo: JSON.stringify(req.body), transactionId: razorpay_payment_id });
            let products = order.products;
            for (let slug in products) {
                await Product.findOneAndUpdate({ slug: slug }, { $inc: { "availableQty": - products[slug].qty } })
            }
            res.redirect(`${process.env.NEXT_PUBLIC_HOST}/order?id=${order._id}&clearCart=1`, 200)
        }
        else {
            order = await Order.findOneAndUpdate({ orderId: razorpay_order_id }, { status: "Pending", paymentInfo: JSON.stringify(req.body) });

            res.status(400).json({
                success: false
            })
        }





    }
}
export default connectDb(handler);