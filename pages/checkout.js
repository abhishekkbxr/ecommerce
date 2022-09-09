import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

function Checkout({ logout, cart, addToCart, removeFromCart, subTotal, clearCart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [user, setUser] = useState({ value: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("myuser"))

    if (user && user.token) {
      setUser(user);
      setEmail(user.email)
    }


  }, [])




  const handelChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinJson = await pins.json();
        if (Object.keys(pinJson).includes(e.target.value)) {
          setCity(pinJson[e.target.value][0]);
          setState(pinJson[e.target.value][1]);
        } else {
          setCity("");
          setState("");
        }
      } else {
        setCity("");
        setState("");
      }
    }

    if (
      name.length > 3 &&
      email.length > 3 &&
      phone.length > 3 &&
      address.length > 3 &&
      pincode.length > 3
    ) {
      setDisabled(false);
    }
  };

  // payment integration with razorpay
  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const value = {
      cart,
      subTotal,
      email,
      name,
      phone,
      address,
      pincode,
    };
    const data = await fetch(`/api/payment/razorpay`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(value),
    });

    let b = await data.json();
    if (b.success !== true) {
      if (b.cartClear) {
        clearCart()
      }

      toast.error(b.error, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Abhishek Pvt Ltd",
      currency: b.currency,
      amount: b.amount,
      order_id: b.id,
      description: "Thankyou for your test donation",
      callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/payment/paymentVerification`,
      prefill: {
        name: "Abhishek kumar",
        email: "abhishekbxr203@gmail.com",
        contact: "7462062717",
      },
    };


    const paymentObject = new window.Razorpay(options);
    paymentObject.open();



    // create order after payment verfication

    const OrderData = {
      cart,
      subTotal,
      orderId: b.id,
      email,
      name,
      phone,
      address,
      pincode,
      city,
      state,

    };
    const p = await fetch(`/api/payment/order`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(OrderData),
    });
    let order = await p.json();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);


      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <>

      <div className="container px-2 sm:m-auto  ">
        <Head>
          <title>Checkout</title>
          <meta name="description" content="Ecommerce - Buy everything " />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <h1 className="font-bold text-3xl text-center my-2"> Checkout </h1>
        <div className="md:flex sm:flex-row">
          <div className="md:w-1/2 md:border-r-2 border-gray-200 ">
            <h2 className="font-semibold text-xl my-3 ">1. Delivery Details</h2>
            <div className="mx-auto flex  ">
              <div className="px-2 w-1/2">
                <div className=" mb-4">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    onChange={handelChange}
                    value={name}
                    type="name"
                    id="name"
                    name="name"
                    className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="px-2 w-1/2">
                <div className=" mb-4">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  {user && user.token ? (<input

                    value={user.email}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full opacity-60 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    readOnly={true}
                  />) : <input
                    onChange={handelChange}
                    value={email}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />}

                </div>
              </div>
            </div>
            <div className="px-2 w-full">
              <div className=" mb-4">
                <label htmlFor="address" className="leading-7 text-sm text-gray-600">
                  Address
                </label>
                <textarea
                  onChange={handelChange}
                  value={address}
                  name="address"
                  id="address"
                  cols="30"
                  rows="3"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>

            <div className="mx-auto flex ">
              <div className="px-2 w-1/2">
                <div className=" mb-4">
                  <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                    Phone
                  </label>
                  <input
                    onChange={handelChange}
                    placeholder="10-Digit phone number"
                    value={phone}
                    type="phone"
                    id="phone"
                    name="phone"
                    className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="px-2 w-1/2">
                <div className=" mb-4">
                  <label
                    htmlFor="pincode"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Pincode
                  </label>
                  <input
                    onChange={handelChange}
                    value={pincode}
                    type="text"
                    id="pincode"
                    name="pincode"
                    className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
            </div>
            <div className="mx-auto flex ">
              <div className="px-2 w-1/2">
                <div className=" mb-4">
                  <label htmlFor="state" className="leading-7 text-sm text-gray-600">
                    District
                  </label>
                  <input
                    onChange={handelChange}
                    value={city}
                    type="text"
                    id="city"
                    name="city"
                    className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="px-2 w-1/2">
                <div className=" mb-4">
                  <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                    State
                  </label>
                  <input
                    onChange={handelChange}
                    value={state}
                    type="text"
                    id="state"
                    name="state"
                    className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
            </div>
          </div>


          <div className=" md:w-1/2 md:px-1 ">
            <h2 className="font-semibold text-xl my-3">2. Review Cart-items</h2>

            {/* cart items  */}
            <div className="sideCart sm:px-4 md:px-16 py-6 bg-pink-100 md:rounded-lg m-2 md:h-[50vh] ">
              <ol className="list-decimal my-5 mx-1 font-semibold ">
                {Object.keys(cart).length == 0 && (
                  <div className="font-normal text-gray-600">Your cart is empty </div>
                )}

                {Object.keys(cart).map((k) => {
                  return (
                    <li key={k}>
                      <div className="item flex mx-3">
                        <div className=" font-semibold ">
                          {cart[k].name}({cart[k].size / cart[k].varient})
                        </div>
                        <div className="w-1/3 mx-0 font-semibold flex justify-center items-center text-lg ">
                          <AiFillPlusCircle
                            onClick={() => {
                              addToCart(
                                k,
                                1,
                                cart[k].price,
                                cart[k].name,
                                cart[k].size,
                                cart[k].varient
                              );
                            }}
                            className="text-pink-500 cursor-pointer "
                          />{" "}
                          <span className="mx-2">{cart[k].qty}</span>{" "}
                          <AiFillMinusCircle
                            onClick={() => {
                              removeFromCart(
                                k,
                                1,
                                cart[k].price,
                                cart[k].name,
                                cart[k].size,
                                cart[k].varient
                              );
                            }}
                            className="text-pink-500 cursor-pointer "
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div className="font-bold "> <span className="border-b-2 border-pink-500">subTotal:</span> ₹{subTotal} </div>
            </div>


          </div>

        </div>
        <div className=" mx-auto w-[80vw] item-centre text-center mt-12 ">
          <Link href="/checkout">
            <button
              //  disabled={disabled}
              onClick={makePayment}
              className="disabled:bg-pink-200  text-center items-center text-white bg-pink-500 border-0 py-4 px-12  focus:outline-none hover:bg-pink-600 rounded text-lg"
            >
              Pay ₹{subTotal}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Checkout;
