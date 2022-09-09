// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../middleware/mongoose";
import User from "../../../models/User";
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    if (req.method == "POST") {
        const { address, city, state, pincode, name, phone } = req.body
        let token = req.body.token;
        let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        let userdata = await User.findOneAndUpdate({ email: user.email }, { address, city, state, pincode, name, phone })
        res.status(200).json({ success: true })

    }
    else {

        res.status(400).json({ success: false })
    }

}
export default connectDb(handler);