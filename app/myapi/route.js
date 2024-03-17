import Product from "../models/product"
import connectDB from "../db/page"
import { request, requestuest } from "http";
export async function POST() {


    
    try {
        const body = request.body;
        await connectDB();

        // Assuming request body contains the necessary data
       
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

        // You can perform any necessary operations here, such as saving the data to the database
        await product.save()

        // Return success response
        return Response.json( {
            status: 200, // OK
            body: { message: 'Success' }
        });
    } catch (error) {
        console.error(error);
        // Return error response if an exception occurs
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
        return Response.json({ data: products });
    } catch (error) {
        return Response.json({ error });
    }
}