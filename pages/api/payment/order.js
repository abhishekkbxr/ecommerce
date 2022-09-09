import connectDb from "../../../middleware/mongoose";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // initiate order corresponding to this order id

    let order = new Order({
      name: req.body.name,
      email: req.body.email,
      orderId: req.body.orderId,
      amount: req.body.subTotal,
      address: req.body.address,
      pincode: req.body.pincode,
      state: req.body.state,
      city: req.body.city,
      phone: req.body.phone,
      products: req.body.cart,
    });

    await order.save();
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json("method not allow ");
  }
};

export default connectDb(handler);
