const { default: mongoose } = require('mongoose')
const mongoose= require('mongoose')

const UserSchema= new mongoose.Schema({
    Name: {type:string, require:true},
    
    Email: {type:string, require:true},
    Password: {type:string, require:true},
   

},{timestamps:true})
export default mongoose.model("Users", UserSchema)