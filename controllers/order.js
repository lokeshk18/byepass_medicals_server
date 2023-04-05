const Order = require("../models/order")

module.exports.addOrder = async(req,res)=>{
    try{
        const order = req.body
        const pdt = new Order(order)
        await pdt.save()
        return res.status(201).json("Ordered");
    }
    catch(err){
        res.status(401).json(err);
    }
}

module.exports.getOrder = async (req,res)=>{
    try{
        const order = await Order.find({userId:req.body.userId})
        res.status(200).json(order)
    }
    catch(err){
        res.status(400).json(err)
    }
}

module.exports.changeStatus = async (req,res)=>{
    try{
        const status="delivered"
        await Order.findByIdAndUpdate(req.params.id,status,{new:true})
        res.status(201).json("Changed")
    }
    catch(err){
        res.status(401).json(err);
    }
}