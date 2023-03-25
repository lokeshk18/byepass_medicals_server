const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CartSchema = new Schema({
    userId: { type:String , required:true},
    products: [
        {
            productId: String,
            quantity: { type: Number,default:1}
        }
    ]
    // createdAt:Date.now()
} , { timestamps : true })

module.exports = mongoose.model('Cart',CartSchema)