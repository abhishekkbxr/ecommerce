import connectDb from "../../../middleware/mongoose";
import { parse } from "postcss";
import Product from "../../../models/Product";
import pincodes from "../../../pincodes.json";
const Razorpay = require("razorpay");
const shortid = require("shortid");

const handler = async (req, res) => {
  if (req.method === "POST") {



    // check weather the cart is tempered or not
    let product,
      sumTotal = 0;
    const cart = req.body.cart;

    // check the pin code is servicable or not 

    if (!Object.keys(pincodes).includes(req.body.pincode)) {
      res
        .status(200)
        .json({
          success: false,
          error: "The entered pincode is not servicable try with another pincode  ",
          cartClear: false,
        });
      return;
    }

    if (req.body.subTotal <= 0) {
      res
        .status(200)
        .json({
          success: false,
          error:
            " oops... Invalid cart ,please build your cart and try again !!!!",
          cartClear: true,
        });
      return;
    }


    // if (req.body.phone.lenght !== 10 || !Number.isInteger(Number(req.body.phone))) {
    //   res
    //     .status(200)
    //     .json({
    //       success: false,
    //       error: " Please enter your 10-Digit phone number !!!!",
    //       cartClear: false,
    //     });
    //   return;
    // }
    // if (req.body.pincode.lenght !== 6 || !Number.isInteger(Number(req.body.pincode))) {
    //   res
    //     .status(200)
    //     .json({
    //       success: false,
    //       error: " Please enter your 6-Digit Pincode !!!!",
    //       cartClear: false,
    //     });
    //   return;
    // }

    for (let item in cart) {
      sumTotal += cart[item].price * cart[item].qty;
      product = await Product.findOne({ slug: item });
      if (product.price !== cart[item].price) {
        res
          .status(200)
          .json({
            success: false,
            error:
              " oops !! Price of some item have changed (invalid Order) Please Try again !!!! ",
            cartClear: true,
          });
        return;
      }
      // Check weather the cart items are out of stock

      if (product.availableQty < cart[item].qty) {
        res
          .status(200)
          .json({
            success: false,
            error:
              " oops !! Items are in out of stock ... Please Try again later !!!! ",
            cartClear: true,
          });
        return;
      }
    }
    if (sumTotal !== req.body.subTotal) {
      res
        .status(200)
        .json({
          success: false,
          error: " oops !! Your cart is tempered ... Please Try again !!!! ",
          cartClear: true,

        });
      return;
    }

    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture = 1;
    const amount = req.body.subTotal;
    const currency = "INR";
    const options = {
      amount: amount * 100,
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        success: true,
        cartClear: false,

      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
};

export default connectDb(handler);
