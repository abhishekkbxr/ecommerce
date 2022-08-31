import Payment from "../../../models/Payment";
import connectDb from "../../../middleware/mongoose";
const crypto = require("crypto");

const handler = async (req, res) => {

    if (req.method === "POST") {
        // verify payment 

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body

        const body = razorpay_order_id + "|" + razorpay_payment_id

        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

        // console.log("sig generated " ,razorpay_signature)
        // console.log("sig expected " ,expectedSignature)

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            await Payment.create({ razorpay_payment_id, razorpay_order_id, razorpay_signature })
            res.redirect(`${process.env.NEXT_PUBLIC_HOST}/order?orderId=${razorpay_order_id}`)

        }
        else {
            res.status(400).json({
                success: false
            })
        }

      



    }
}
export default connectDb(handler);