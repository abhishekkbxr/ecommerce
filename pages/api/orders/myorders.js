import Order from "../../../models/Order";
import jsonwebtoken from "jsonwebtoken"
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {

  const token = req.body.token;
  const data = jsonwebtoken.verify(token, process.env.JWT_SECRET)
  const orders = await Order.find({ email: data.email, status: "paid" })
  res.status(200).json({ orders })

}

export default connectDb(handler);