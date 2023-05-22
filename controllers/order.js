const Order = require("../models/order")
const Product = require("../models/products")

module.exports.addOrder = async(req,res)=>{
    // try{
    //     const order = req.body
    //     const pdt = new Order(order)
    //     await pdt.save()
    //     return res.status(201).json("Ordered");
    // }
    // catch(err){
    //     res.status(401).json(err);
    // }
    try{
        const order = req.body 
        console.log(order)
        const {userId} = req.body.userId
        const a = await Order.findOne(userId)
        const pdt = new Order({
                userId:req.body.userId,
                products:req.body.products,
                amount:order.amount,
                address:order.address
            })
            await pdt.save()
            return res.status(201).json("Created");
    }
    catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}

module.exports.getOrder = async (req,res)=>{
    try{
        console.log(req.params.id)
        const order = await Order.find({userId:req.params.id})

        var o = []
        for(var i=0;i<order.length;i++){
            var a={}
            a.product=[]
            a.quantity=[]
            for(var j=0;j<order[i].products.length;j++){
                const p =await Product.findById(order[i].products[j].productId)
                a.product.push(p)
                a.quantity.push(order[i].products[j].quantity)
                console.log(order[i].products[j].productId)
            }
            
            o.push(a)
        }
        console.log(o)
        res.status(200).json(o);
    }
    catch(err){
        res.status(400).json(err)
    }
}

module.exports.allOrders = async(req,res)=>{
    try{
        const orders = await Order.find({})
        res.status(200).json(orders)
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