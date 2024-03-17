
import connectDB from "../db/page";
import { HttpStatusCode } from 'axios';
import { UpdateProductDto } from "./update";
import Product from './product';
import { NextRequest, NextResponse } from 'next/server';
import { CreateProductDto } from "./createdto";
export async function POST(req:NextRequest) {


    
    try {
        
        await connectDB();
        const body: CreateProductDto = await req.json();
      
     
        let product= new Product({
            
             title: body.title,
            slug: body.slug,
            img: body.img,
            details: body.details,
            availableQty: body.availableQty,
            variants: body.variants,
            price: body.price,
            color: body.color,
            size: body.size,
            category: body.category
        })
        await product.save()
        return Response.json( {
            status: 200, 
            product,
            body: { message: 'Success' }
        });
    } catch (error) {
        console.error(error);
     
        return Response.json( {
            status: 400, // OK
            body: { message: "error" }
        });
    }
}

export async function GET() {
    try {
        await connectDB();
        const products = await Product.find();
        let tshirt = {};
        for(let item of products){

            if(item.title in tshirt){
                         if(!tshirt[item.title].color.includes(item.color)&&item.availableQty>0){
                            tshirt[item.title].color.push(item.color)
                         }
                         if(!tshirt[item.title].size.includes(item.size)&&item.availableQty>0){
                            tshirt[item.title].size.push(item.size)
                         }
            }
            else{

                tshirt[item.title] = JSON.parse(JSON.stringify(item))
                if(item.availableQty>0){
                    tshirt[item.title].color=[item.color]
                    tshirt[item.title].size=[item.size]
                }
            }
        }
        return Response.json({ data: tshirt });
    } catch (error) {
        return Response.json({ error });
    }
} 
