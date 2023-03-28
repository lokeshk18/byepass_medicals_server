const jwt = require("jsonwebtoken");

module.exports.verifyToken =async (req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        // const token=authHeader.split(" ")[1];
        const token=authHeader;
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err) return res.status(401).json("Token not valid");
            req.user=user;
            next();
        });
    }
    else{
        res.status(401).json("Not Authenticated");
    }
}

// module.exports.verifyUser = async(req,res,next)=>{
//     this.verifyToken(req,res,()=>{
//         if(req.params.id===req.user.id){
//             next();
//         }
//         else{
//             console.log(req.params.id,req.user.id)
//             res.status(401).json("Not valid User");
//         }
//     })
// }

module.exports.verifyAdmin = async (req,res,next)=>{
    this.verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            console.log(req.user)
            res.status(401).json("Not Admin");
        }
    })
}