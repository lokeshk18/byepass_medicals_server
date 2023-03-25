const Product = require("../models/products")

module.exports.newproduct = async (req,res)=>{
    var pdt=req.body;
    // console.log(pdt);
    const product = new Product(pdt);
    console.log(product);
    await product.save();
    res.send("Product Added");
}

module.exports.allproducts = async (req,res)=>{
    var products= await Product.find({})
    console.log(products)
    res.send("Received");
}