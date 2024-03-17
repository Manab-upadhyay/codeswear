"use client"

import { useState } from "react"
import { useEffect } from "react"
import connectDB from "../../db/page";
import Product from "../../models/product";




async function getdata() {
  try {
    await connectDB(); 
    let products = await Product.find();
    let tshirt = {};
    for (let item of products) {
      if (item.title in tshirt) {
        if (!tshirt[item.title].color.includes(item.color) && item.availableQty > 0) {
          tshirt[item.title].color.push(item.color);
        }
        if (!tshirt[item.title].size.includes(item.size) && item.availableQty > 0) {
          tshirt[item.title].size.push(item.size);
        }
      } else {
        tshirt[item.title] = JSON.parse(JSON.stringify(item));
        if (item.availableQty > 0) {
          tshirt[item.title].color = [item.color];
          tshirt[item.title].size = [item.size];
        }
      }
    }
    return tshirt;
  } catch (error) {
    console.error('Error in getdata:', error);
    throw error;
  }
}


export default function Productitem(){
  let product= getdata();
 console.log(product)
  const [pin, setpin]=useState()
  const [service, setservice]= useState()
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
    e.preventDefault()
      let myCart = { ...cart };
      if (itemcode in cart) {
          myCart[itemcode].qty = cart[itemcode].qty + qty;
          setCart(myCart);
          saveCart(myCart);
      } else {
          myCart[itemcode] = { qty: 1, price, name, variant };
          setCart(myCart);
          saveCart(myCart);
      }
    
      
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

  async function  checkservice(){
        let pins = await  fetch('http://localhost:3000/api');
        console.log(pins);
        let pinjson = await pins.json();
        if(pinjson.includes(parseInt(pin))){
          setservice(true);
        }
        else{
          setservice(false);
        }



  }
  const handleChange = (e) => {
    setpin(e.target.value)
}

 

  return (
    <>
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://m.media-amazon.com/images/I/71eTK2YpnyL._SY879_.jpg"/>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">The Catcher in the Rye</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">4 Reviews</span>
          </span>
          <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
            <a className="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
        </div>
        <p className="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="flex">
            <span className="mr-3">Color</span>
            <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
            <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>
          </div>
          <div className="flex ml-6 items-center">
            <span className="mr-3">Size</span>
            <div className="relative">
              <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 text-base pl-3 pr-10">
                <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">$58.00</span>
          <button className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Buy Now</button>
          <button onClick={()=>{addCart(7855, 1,499, "wear the code ","red")}} className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">
           Add to cart 
          </button>
        </div>
        <div className="flex space-x-2 my-5">
      <input type="text"placeholder="enter the pin code " className=" border-2 border-gray-400 rounded-md"  onChange={handleChange}></input>
  <button className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded" onClick={checkservice}>Check </button>
      </div>
      {(!service && service!=null)&& (
    <div className="text-red-600">
        Sorry! We do not deliver to this pin code.
    </div>
)}
{(service && service !== null) && (
    <div className="text-green-500">
        Yay! Your pincode is deliverable
    </div>
)}

      </div>
     
     
    </div>
    
  </div>
  
</section>
    </>
  )
}