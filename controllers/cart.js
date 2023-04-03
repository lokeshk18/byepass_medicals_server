const Cart = require("../models/cart")

module.exports.addCart = async (req,res)=>{
    try{
        const cart = req.body 
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