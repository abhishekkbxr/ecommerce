// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../../middleware/mongoose";
import User from "../../../models/User";
var AES = require("crypto-js/aes");
var CryptoJS = require("crypto-js");


const handler = async (req, res) => {
    if (req.method == "POST") {
        const {name , email } =req.body;
        let user = new User({name , email  , password:CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString()})
        await user.save()
        
        res.status(200).json({ success: true ,success:"success" });

    } else {
        res.status(400).json({success: false , error: "this method is not allowed " });
    }
};


export default connectDb(handler);
