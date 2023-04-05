const Product = require("../models/products")

module.exports.newpdt = async (req,res)=>{
    try{
        var pdt=req.body;
        const product = new Product(pdt);
        await product.save();
        res.status(201).json("Product Added");
    }
    catch(err){
        res.status(401).json(err)
    }
}

module.exports.allpdt = async (req,res)=>{
    try{
        var products= await Product.find({})
        res.status(201).json("Received");
    }
    catch(err){
        res.status(401).json(err)
    }
}

module.exports.products = async(req,res)=>{
    try{
        var products= await Product.find({category:req.params.id});
        console.log(req.params.id)
        res.status(201).json(products);
    }
    catch(err){
        res.status(401).json(err)
    }
}

module.exports.viewproduct = async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }
    catch(err){
        res.status(401).json(err);
    }
}

module.exports.editpdt = async(req,res)=>{
    try{
        var pdt = req.body
        await Product.findByIdAndUpdate(req.params.id,pdt,{new:true}) //new true means it returns updated doc
        res.status(201).json("Edited")
    }
    catch(err){
        res.status(401).json(err)
    }
}

module.exports.removepdt = async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(201).json("Product Removed");
    }
    catch(err){
        res.status(401).json(err)
    }
}