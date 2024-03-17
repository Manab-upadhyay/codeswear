

import {models} from 'mongoose';
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: String,
    slug: String,
    img: String,
    details: String,
    availableQty: Number,
    variants: String,
    price: Number,
    color: String,
    size: String,
    category: String
},);


const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;;