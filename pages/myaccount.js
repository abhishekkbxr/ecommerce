import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

function MyAccount() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const [user, setUser] = useState({ value: null });

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser) {
      router.push("/");
    }
    if (myuser && myuser.token) {
      setUser(myuser);
      setEmail(myuser.email);
      fetchuser(myuser.token);
    }
  }, []);

  const fetchuser = async (token) => {
    let data = { token: token };
    const p = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/getuser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await p.json();
    console.log(res)
    setName(res.name);
    setAddress(res.address);
    setCity(res.city);
    setState(res.state);
    setPincode(res.pincode);
    setPhone(res.phone);
  };

  const handelChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    } else if (e.target.name == "npassword") {
      setNpassword(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name == "city") {
      setCity(e.target.value);
    } else if (e.target.name == "state") {
      setState(e.target.value);
    }
  };

  const handleUpdate = async () => {
    let data = {
      token: user.token,
      address,
      name,
      pincode,
      state,
      city,
      phone,
    };
    const p = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/user/updateuser`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let res = await p.json();
    if (res.success) {
      toast.success("Your profile is updated Successfully", {
        position: "top-left",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(res.error, {
        position: "top-left",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handlePassword = async () => {
    let data = { token: user.token, password, cpassword, npassword };
    const p = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/user/updatePassword`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let res = await p.json();
    if (res.success) {
      toast.success("Password updated successfully", {
        position: "top-left",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(res.error, {
        position: "top-left",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container mx-auto ">
      <Head>
        <title>My Profile</title>
        <meta name="description" content="Ecommerce - Buy everything " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="text-2xl text-center font-bold ">Update your account</h1>
      <div className="md:flex md:my-12 ">
        <div className=" md:w-1/2 md:border-r-2 border-gray-200">
          <h2 className="font-semibold text-xl my-3">1. Delivery Details</h2>
          <div className="mx-auto flex ">
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
                  Email (cannot be Update)
                </label>
                {user && user.token ? (
                  <input
                    value={user.email}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full opacity-60 bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    readOnly={true}
                  />
                ) : (
                  <input
                    onChange={handelChange}
                    value={email}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                )}
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
          <button
            onClick={handleUpdate}
            className="disabled:bg-pink-200 flex px-4 mx-2 py-1 text-white bg-pink-500 border-0 mb-8  focus:outline-none hover:bg-pink-600 rounded text-lg"
          >
            submit
          </button>
        </div>

        <div className="md:w-1/2 md:px-10 ">
          <h2 className="font-semibold text-xl my-3 ">2. Change Password</h2>
          <div className="mx-auto flex-row  ">
            <div className="px-2 ">
              <div className=" mb-4">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                  Password
                </label>
                <input
                  onChange={handelChange}
                  value={password}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 ">
              <div className=" mb-4">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                  New Password
                </label>
                <input
                  onChange={handelChange}
                  value={npassword}
                  type="password"
                  id="npassword"
                  name="npassword"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="px-2 ">
              <div className=" mb-4">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                  Confirm New Password
                </label>
                <input
                  onChange={handelChange}
                  value={cpassword}
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handlePassword}
            className="disabled:bg-pink-200 flex px-4 mx-2 py-1 text-white bg-pink-500 border-0   focus:outline-none hover:bg-pink-600 rounded text-lg"
          >
            change password
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
