import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import LoadingBar from "react-top-loading-bar";

function Navbar({
  logout,
  Key,
  user,

  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
}) {
  const [Dropdown, setDropdown] = useState(false)
  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
        <div className="logo mr-auto mx-5 md:mx-5 my-2 cursor-pointer">
          <Link href={"/"}>
            <a>
              <Image src={"/logo.png"} alt="logo" width={120} height={30} />
            </a>
          </Link>
        </div>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base  justify-center">
          <Link href={"/tshirts"}>
            <a className="mr-5 font-bold hover:text-gray-900">Tshirts</a>
          </Link>
          <Link href={"/hoodies"}>
            <a className="mr-5 font-bold hover:text-gray-900">Hoodies</a>
          </Link>
          <Link href={"/stickers"}>
            <a className="mr-5 font-bold hover:text-gray-900">Stickers</a>
          </Link>
          <Link href={"/mugs"}>
            <a className="mr-5 font-bold hover:text-gray-900">Mugs</a>
          </Link>
        </nav>
      </div>

      <div className="cart absolute right-0 top-3 mx-5 cursor-pointer flex space-x-2">
        <span onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>
            {Dropdown && <div className="absolute right-9 bg-white shadow-lg border top-9 rounded-md p-2 w-32" onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>
              <ul>
                <Link href={"/myaccount"}><a><li className="py-1 hover:text-pink-700 text-sm font-bold ">My Account</li></a></Link>
                <Link href={"/orders"}><a><li className="py-1 hover:text-pink-700 text-sm font-bold ">Orders</li></a></Link>
                <li onClick={logout} className="py-1 hover:text-pink-700 text-sm font-bold ">Logout</li>
              </ul>
            </div>}


            {user.value && (
              <MdOutlineAccountCircle className="text-2xl md:text-4xl" />
            )}
          </span>
          {!user.value && (
            <Link href={"/login"}>
              <a>
                <button className="bg-pink-500 px-2 py-1 rounded-md mx-2 my-1 text-white" >login</button>
              </a>
            </Link>
          )}

        <AiOutlineShoppingCart
          className="text-2xl md:text-4xl"
          onClick={toggleCart}
        />
      </div>

      {/* side cart bar */}

      <div
        ref={ref}
        className={` w-60 h-[100vh] sideCart overflow-y-scroll fixed right-0 z-10 top-0 p-8 px-6 bg-pink-100 transform transition-transform  "translate-x-full" `}
      >
        {" "}
        <h2 className="font-bold text-xl text-center">shoping cart </h2>
        <span
          onClick={toggleCart}
          className="absolute top-3 right-4 cursor-pointer text-2xl text-pink-500 "
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal my-5 mx-1 font-semibold ">
          {Object.keys(cart).length == 0 && (
            <div className="font-normal text-gray-600 ">Your cart is empty </div>
          )}

          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex mx-3 ">
                  <div className="w-2/3 font-semibold ">{cart[k].name}({cart[k].size}/{cart[k].varient})</div>
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

        <div className="flex">
          <Link href="/checkout">
            <a>
              <button className="flex mr-2  mt-0 text-white bg-pink-500 border-0 py-1 px-1 focus:outline-none hover:bg-pink-600 rounded text-sm">
                <BsFillBagCheckFill className="mt-1 mx-1" /> Checkout
              </button>
            </a>
          </Link>
          <button
            onClick={clearCart}
            className="flex  mt-0 text-white bg-pink-500 border-0 py-1 px-1 focus:outline-none hover:bg-pink-600 rounded text-sm"
          >
            clear Cart
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
