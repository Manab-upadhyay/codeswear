

"use client"
import Image from "next/image"

import './globals.css'
import Navbar from "./Components/navbar";
import Footer from "./Components/footer";
import {  useState } from "react";
import { useEffect } from "react";


export default function RootLayout({ children}) {
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
  function clearCart(){
    setCart({});
      saveCart({})
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
    <html lang="en">
        <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
 <body>
 
 <Navbar key={cart} cart={cart} addcart={addCart} removefromcart={removefromCart} clearcart={clearCart} total={total}/>
 
 {children}
  
    <Footer/>
  </body> 
   
  
   
  
    </html>
  );
}
