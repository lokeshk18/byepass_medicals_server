const Product = require("../models/products")

module.exports.newpdt = async (req,res)=>{
    var pdt=req.body;
    // console.log(pdt);
    const product = new Product(pdt);
    console.log(product);
    await product.save();
    res.send("Product Added");
}

module.exports.allpdt = async (req,res)=>{
    var products= await Product.find({})
    console.log(products)
    res.send("Received");
}

module.exports.products = async(req,res)=>{
    var products= await Product.find({category:req.params.id});
    console.log(products)
    res.send("Got it");
}

module.exports.editpdt = async(req,res)=>{
    console.log("Ai");
    var pdt = req.body
    console.log(req.params.id)
    var product = await Product.findByIdAndUpdate(req.params.id,pdt)
    await product.save()
    res.send("Edited")
}

module.exports.removepdt = async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id)
    res.send("Product Removed");
}