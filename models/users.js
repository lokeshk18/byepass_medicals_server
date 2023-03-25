const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type:String , required:true},
    email: { type:String , required:true},
    password: { type:String , required:true},
    // isAdmin: {
    //     type:boolean,
    //     default:false, 
    // }
} , { timestamps : true })

module.exports = mongoose.model('User',UserSchema)

//timestamp provides createdAt and updatedAt fns
//automatically stores it