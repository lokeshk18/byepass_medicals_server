const Cart = require("../models/cart")
const Product = require("../models/products")

module.exports.addCart = async (req,res)=>{
    try{
        const cart = req.body 
        console.log(req.body)
        const {userId} = req.body.userId
        const a = await Cart.findOne(userId)
        if(a==null){
            const pdt = new Cart({userId:cart.userId,products:{productId:cart.productId,quantity:cart.quantity}})
            await pdt.save()
            return res.status(201).json("Created");
        }
        else{
                var arr = new Array()
                arr=a.products;
                arr.push({productId:cart.productId,quantity:cart.quantity})
                await Cart.findOneAndUpdate(userId,{products:arr},{new:true})
                return res.status(201).json("Added");
        }

    }
    catch(err){
        res.status(401).json(err);
    }
}

module.exports.getCart = async (req,res)=>{
    try{
        const cart = await Cart.find({userId:req.params.id})
        var pdt = []
        for(var i=0;i<cart[0].products.length;i++){
            let a= await Product.findById(cart[0].products[i].productId)
            pdt.push(a);
        }
        console.log(pdt)
        res.status(200).json(pdt);
    }
    catch(err){
        res.status(400).json(err);
    }
}

module.exports.removeCart = async(req,res)=>{
    try{
        const cart = await Cart.find({userId:req.params.id})
        const delpdt = req.body.id;
        var a2 = cart[0].products.filter(e=>e.productId!=delpdt)
        const newcart = await Cart.findOneAndUpdate({userId:req.params.id},{products:a2},{new:true})
        console.log(newcart)
        res.status(200).json(newcart);
    }
    catch(err){

    }
}