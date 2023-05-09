const User = require("../models/users")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

module.exports.register = async (req,res)=>{
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
        address:req.body.address,
        isAdmin : req.body.isAdmin
    });
    console.log(newUser);
    try{
        const savedUser = await newUser.save();
        console.log("created")
        res.status(201).json(savedUser)
    }
    catch(err){
        console.log("nope");
        res.status(500).json(err)
    }
}


module.exports.login = async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        !user && res.status(401).json("User not found");

        const hashedPassword = CryptoJS.AES.decrypt( 
            user.password,
            process.env.PASS_SEC
        )
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        // originalPassword !== req.body.password && res.status(401).json("Wrong Password");
        if(originalPassword!=req.body.password){
            return res.status(401).json("Wrong Password")
        }
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SEC,
        {expiresIn:"3d"}
        )

        const { password, ...others} = user._doc;
        //password is separately stored so that we dont display it
        console.log("Logged")
        res.status(200).json({...others,accessToken});
    }
    catch(err){
        res.status(500).json(err)
    }
}