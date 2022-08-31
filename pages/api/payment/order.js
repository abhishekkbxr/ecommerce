import connectDb from "../../../middleware/mongoose";
import Order from "../../../models/Order";

const handler = async (req, res) => {

    if (req.method === "POST") {
        // initiate order corresponding to this order id 

        let order = new Order({
            email: req.body.email,
            orderId: req.body.orderId,
            address: req.body.address,
            amount: req.body.subTotal,
            products: req.body.cart,
        })

        await order.save();
        res.status(400).json({success:"success"})

    }
    else{
        res.status(400).json("method not allow ")
    }
}

export default connectDb(handler);