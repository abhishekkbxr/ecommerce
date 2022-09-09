// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../middleware/mongoose";
import User from "../../../models/User";
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    if (req.method == "POST") {

        let token = req.body.token;
        let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        let userdata = await User.findOne({ email: user.email })
        const { name, email, pincode, address, city, state, phone } = userdata
        res.status(200).json({success:true,  name, email, pincode, address, city, state, phone })

    }
    else {

        res.status(400).json({ error: "error" , success:false })
    }

}
export default connectDb(handler);