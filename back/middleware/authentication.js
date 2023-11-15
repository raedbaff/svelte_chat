const jwt=require("jsonwebtoken")
const validateToken=async (req,res,next)=>{
    try {
        let token;
        let authHeader=req.headers.Authorization || req.headers.authorization;
        if (!authHeader){
            return res.status(404).json("no token found")
        }
        if (authHeader && authHeader.startsWith("Bearer")){
            token=authHeader.split(" ")[1];
            jwt.verify(token,"baffSecretKey",(err,decoded)=>{
                if (err){
                    res.status(401).json({message:"user is not authorized"})
                }
                req.user=decoded.user
                next();
            })
            if (!token){
                res.status(401).json({message:"user not authorized or token is missing"})
            }
        }

    }
    catch(error){
        res.status(500).json({error:error.message})
    }

}
module.exports=validateToken