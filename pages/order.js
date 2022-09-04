import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Order from "../models/Order.js";
import mongoose from 'mongoose';


function Myorder({ order , clearCart }) {
  // console.log(order)
const router = useRouter()
  let products = order.products;

  useEffect(() => {
   if(router.query.clearCart==1){
    clearCart()
   }
  }, [])
  


  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <div className="flex">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Red_store</h2>
       
            </div>
            
            <h1 className="text-gray-900 text-2xl title-font font-medium mb-4">order id: <span className='text-gray-600 text-xl title-font font-medium '> {order.orderId} </span> </h1>
           
            <p className="leading-relaxed mb-4">Your order had been succsfully placed , your payment status is <span className='text-gray-600 text-xl title-font font-medium '>{order.status} </span> </p>


            <div className="flex mb-4">
              <a className="flex-grow    py-2 text-lg px-1">Item Description</a>
              <a className="flex-grow  py-2 text-lg px-1">Quantity</a>
              <a className="flex-grow  py-2 text-lg px-1">Item Total</a>
            </div>

            {Object.keys(products).map((key) => {
              return  <div key={key}  className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">{products[key].name}({products[key].size}/{products[key].varient})  </span>
                <span className="m-auto text-gray-900">{products[key].qty}</span>
                <span className="m-auto text-gray-900">{products[key].qty} X ₹{products[key].price}  = ₹ {products[key].price * products[key].qty} </span>
              </div>
            })}
           
            <div className="flex my-8">
            
              <button className="flex  text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track order</button>
              <span className="title-font ml-auto font-medium text-2xl text-gray-900">Total: ₹{order.amount}</span>
            </div>
          </div>
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI, () => {
      console.log("connected");
    });
  }
  let order = await Order.findById(context.query.id)



  return {
    props: {
      order: JSON.parse(JSON.stringify(order))

    }, // will be passed to the page component as props
  };
}





export default Myorder