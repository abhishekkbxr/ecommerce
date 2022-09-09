// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../middleware/mongoose";
import User from "../../../models/User";
var AES = require("crypto-js/aes");
// var CryptoJS = require("crypto-js");
import CryptoJS from "crypto-js"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    if (req.method == "POST") {
        const { password, cpassword , npassword } = req.body;
        let token = req.body.token;
        let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        let userdata = await User.findOne({ email: user.email })
        let bytes = CryptoJS.AES.decrypt(userdata.password, `${process.env.AES_SECRET}`)
        let decryptedPass = bytes.toString(CryptoJS.enc.Utf8)
        if (decryptedPass == password && npassword == cpassword) {
            let userdata = await User.findOneAndUpdate({ email: user.email }, { password: CryptoJS.AES.encrypt(req.body.cpassword, `${process.env.AES_SECRET}`).toString() })
            res.status(200).json({ success: true })
        }
        res.status(400).json({ success: false, error: "New password and confirm password should be same " })

    }
    else {

        res.status(400).json({ success: false })
    }

}
export default connectDb(handler);