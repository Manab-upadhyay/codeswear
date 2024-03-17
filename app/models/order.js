const { default: mongoose } = require('mongoose')
const mongoose= require('mongoose')

const OderSchema= new mongoose.Schema({
    userId: {type:string, require:true},
    products:[{ 
        productId: {type:string},
        quantity: {type : Number, default:1}

    }],
    address: {type: string , require: true},
    ammount: {type: Number,require:true},
    status:{type:string, default:"pending ",require: true}

},{timestamps:true})
export default mongoose.model("Oders", OderSchema)