
"use client"
import React, { useState, useEffect } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

export default function Checkout() {
    const [cart, setCart] = useState({});
    const [total, setTotal] = useState(0);

    useEffect(() => {
        try {
            if (localStorage.getItem("cart")) {
                const savedCart = JSON.parse(localStorage.getItem("cart"));
                setCart(savedCart);
                calculateTotal(savedCart);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const calculateTotal = (myCart) => {
        let subtotal = 0;
        Object.keys(myCart).forEach((key) => {
            subtotal += myCart[key].price * myCart[key].qty;
        });
        setTotal(subtotal);
    }

    const saveCart = (myCart) => {
        localStorage.setItem("cart", JSON.stringify(myCart));
        calculateTotal(myCart);
    }

    const addCart = (itemcode, qty, price, name, variant) => {
        let myCart = { ...cart };
        if (itemcode in cart) {
            myCart[itemcode].qty = cart[itemcode].qty + qty;
        } else {
            myCart[itemcode] = { qty: 1, price, name, variant };
        }
        setCart(myCart);
        saveCart(myCart);
    }

    const removefromCart = (itemcode, qty, name, variant) => {
        let myCart = { ...cart };
        if (itemcode in cart) {
            myCart[itemcode].qty = cart[itemcode].qty - qty;
            if (myCart[itemcode].qty <= 0) {
                delete myCart[itemcode];
            }
            setCart(myCart);
            saveCart(myCart);
        }
    }

    return (
        <>
            <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify.</p>
    </div>
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
      <div className="flex flex-wrap -m-2">
        <div className="p-2 w-1/2">
          <div className="relative">
            <label for="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <label for="message" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div className="flex">
        <div className="relative">
            <label for="name" className="leading-7 text-sm text-gray-600">Contact Number</label>
            <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
             <div className="relative mx-6">
            <label for="name" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
       
      
      </div>
    </div>
  </div>
  
  <div className="flex justify-center">
    <h1 className="font-bold items-center" > Your cart</h1>
    </div>
    <div  className="sidecart  bg-yellow-200  py-10 ">
                <h2 className="font-bold text-xl">Shopping Cart</h2>
                <span  className="absolute top-2 right-0 cursor-pointer">
              
                </span>
                <ol>
                    {Object.keys(cart).length===0 &&
                    
                    <div className="my-4"> Your Cart is Empty </div>
                    }
                   { Object.keys(cart).map((k)=>{return <li key={k}> 
                        <div className="flex my-3">
                        <div className="item flex w-2/3" >{cart[k].name} </div>
                   <div className="flex items-center justify-center "> <CiCirclePlus onClick={()=>{addCart(k,1,499,cart[k].name,cart[k].variant)}} className="cursor-pointer " /> <span>{cart[k].qty}</span> <CiCircleMinus  onClick={()=>{removefromCart(k,1,cart[k].name,cart[k].variant)}} className="cursor-pointer" /></div>
                        </div>
                         </li>
                        })}
                       
                </ol>
            </div>
            <div>Total price:{total}</div>

</section>
        </>
    );
}
