const Order = require("../models/order")

module.exports.addOrder = async(req,res)=>{
    try{
        const order = req.body 
        const {userId} = req.body.userId
        const a = await Order.findOne(userId)
        const pdt = new Order(order)
        await pdt.save()
        return res.status(201).json("Ordered");
    }
    catch(err){
        res.status(401).json(err);
    }
}

module.exports.getOrders = async (req,res)=>{
    try{
        const order = await Order.find({userId:req.body.userId})
        res.status(200).json(order)
    }
    catch(err){
        res.status(400).json(err)
    }
}