const User = require("../models/users")

module.exports.editUser = async (req,res)=>{
    try{
        const edit = req.body
        await User.findByIdAndUpdate(req.params.id,edit,{new:true})
        res.status(200).json("Edited User");
    }
    catch(err){
        res.status(401).json(err);
    }
}

module.exports.getUser = async (req,res)=>{
    try{
        const allUsers = await User.find({})
        res.status(201).json(allUsers)
    }
    catch(err){
        res.status(401).json(err)
    }
}