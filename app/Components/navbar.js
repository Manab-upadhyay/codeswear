"use client"
import Image from "next/image";
import Link from "next/link";
import logo from "../logo1.png";
import { FaCartPlus } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useRef } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { RiAccountCircleFill } from "react-icons/ri";

export default function Navbar({cart, addcart, removefromcart, clearcart, total}) {
    
  
   // Correctly using the useRef hook
   function  togglecart() {
   
       
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full'); // Correctly accessing classList
            ref.current.classList.add('translate-x-0'); // Correctly accessing classList
        } else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-0'); // Correctly accessing classList
            ref.current.classList.add('translate-x-full'); // Correctly accessing classList
        }
    }
    const ref = useRef();
    return (
        <div className="flex justify-between items-center my-2 sm:mx-2 shadow-lg sticky top-0  z-10 bg-white">
            <Link href={"/"}>
                <Image src={logo} width={100} height={100} className="" />
            </Link>
            <ul className="flex justify-between space-x-10">
                <li className="font-bold cursor-pointer hover:bg-yellow-100 rounded-md">
                    <Link href={"/tshirt"}>Tshirt</Link>
                </li>
                <li className="font-bold cursor-pointer hover:bg-yellow-100 rounded-md">
                    <Link href={"/hoodies"}>Hoodies</Link>
                </li>
                <li className="font-bold cursor-pointer hover:bg-yellow-100 rounded-md">
                    <Link href={"/mugs"}>Mugs</Link>
                </li>
                <li className="font-bold cursor-pointer hover:bg-yellow-100 rounded-md">
                    <Link href={"/stickers"}>Stickers</Link>
                </li>
            </ul>
            <div className="cart mx-4 cursor-pointer flex ">
               <Link href={"/singin"}><RiAccountCircleFill/></Link> 
                 
            <div onClick={togglecart} className="cart mx-4 cursor-pointer">
           
           <FaCartPlus  width={20} />
       </div>

            </div>
          
        
            <div ref={ref} className="sidecart absolute top-0 right-0 bg-yellow-200 h-[100vh] py-10 transform transition-transform translate-x-full px-8 overflow-hidden">
                <h2 className="font-bold text-xl">Shopping Cart</h2>
                <span onClick={togglecart} className="absolute top-2 right-0 cursor-pointer">
                    <IoIosCloseCircleOutline />
                    
                </span>
               

                <ol>
                    {Object.keys(cart).length===0 &&
                    
                    <div className="my-4"> Your Cart is Empty </div>
                    }
                   { Object.keys(cart).map((k)=>{return <li key={k}> 
                        <div className="flex my-3">
                        <div className="item flex w-2/3" >{cart[k].name} </div>
                   <div className="flex items-center justify-center w-1/3"> <CiCirclePlus onClick={()=>{addcart(k,1,499,cart[k].name,cart[k].variant)}} className="cursor-pointer" /> <span>{cart[k].qty}</span> <CiCircleMinus  onClick={()=>{removefromcart(k,1,cart[k].name,cart[k].variant)}} className="cursor-pointer" /></div>
                        </div>
                         </li>
                        })}
                        <Link href={"/checkout"}><button class="flex ml-auto text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-400 rounded justify-center mx-10">Checkout</button></Link> 
                        <button onClick={clearcart} class="flex ml-auto text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-400 rounded justify-center mx-10 my-5">Clear cart</button>
                </ol>
                
            </div>
           
          
        </div>
       
    );
}
