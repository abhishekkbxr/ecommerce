import Head from "next/head";
import Link from "next/link";
import React from "react";
import Product from "../models/Product";
import mongoose from "mongoose";
import Image from "next/image";

function Tshirts({ products }) {
  return (
    <div>
      <Head>
        <title>T-Shirt</title>
        <meta name="description" content="Ecommerce - Buy everything " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="text-gray-600 body-font items-center justify-center">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-wrap -m-4 justify-center ">


            {Object.keys(products).map((item) => {
              return <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}>
                <div className="lg:w-1/5 md:w-1/2 p-4 w-full cursor-pointer  shadow-lg lg:m-3 ">
                  <a className="block relative  rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="m-auto  h-[36vh] md:h-[36vh]  block"
                      src={products[item].img}
                    />
                  </a>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {products[item].category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <p className="mt-1">₹{products[item].price}.00</p>

                    <div className="mt-1">
                      {products[item].size.includes('S') && <span className="border border-gray-400 mx-1 px-1">S</span>}
                      {products[item].size.includes('M') && <span className="border border-gray-400 mx-1 px-1">M</span>}
                      {products[item].size.includes('L') && <span className="border border-gray-400 mx-1 px-1">L</span>}
                      {products[item].size.includes('XL') && <span className="border border-gray-400 mx-1 px-1">XL</span>}
                      {products[item].size.includes('XXL') && <span className="border border-gray-400 mx-1 px-1">XXL</span>}
                    </div>
                    <div className="mt-1">
                      {products[item].color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-800 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('white') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}


                    </div>
                  </div>
                </div>
              </Link>
            })}

          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI, () => {
      console.log("connected")
    })
  }
  let products = await Product.find({ category: "Tshirt" })
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  }
}

export default Tshirts;
