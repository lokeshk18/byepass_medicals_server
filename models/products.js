const mongoose=require("mongoose")
const Schema=mongoose.Schema

const ProductSchema = new Schema({
    name: String,
    mrp: Number,
    price: Number,
    use: String,
    sideef: String,
    precaution: String,
    directions: String,
    storage: String,
    dosage: String
})

module.exports = mongoose.model('Product',ProductSchema)