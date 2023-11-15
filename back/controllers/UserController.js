const bcrypt=require("bcrypt")
// const path=require("path")
const User=require("../models/User")
const jwt=require("jsonwebtoken")
exports.Register=async(req,res)=>{
    try {
        const {name,LastName,email,password}=req.body
        const hashedpassword=await bcrypt.hash(password,10)
        const user=new User({
            name,
            LastName,
            email,
            password:hashedpassword,
        })
        const validationError = user.validateSync();
        if (validationError) {
        if (validationError.errors.email && validationError.errors.email.kind === "regexp") {
         return res.status(400).json({ error: "Invalid email format. Please provide a valid email address." });
         } else {
         return res.status(400).json({ error: "Validation error", details: validationError.message });
        }
        }
        const savedUser=await user.save(user)
        res.status(200).json(savedUser)
     

    }
    catch(error){
        res.status(500).json(error)

    }
}
exports.Login= async(req,res)=>{
    try {
          
        const {email,password}=req.body
        const user=await User.findOne({email})
        
        if (!user) {
            return res.status(401).json({ error: 'Cannot find user with that email' });
          }
        const matchingPassword=await bcrypt.compare(password,user.password)
        if (!matchingPassword){
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token=jwt.sign({user:{
                    email:user.email,
                    id:user.id
        }},"baffSecretKey",{
            expiresIn:'2h'
        })
        res.json({"accessToken":token,"user":user})
      
        

    }
    catch(error){
        res.status(500).json({ error: 'Error logging in' });

    }
  }
  exports.GetAllUsers=async (req,res)=>{
    try {
        const users=await User.find({})
        if (!users){
            return res.status(404).json("no users found")
        }
        res.status(200).json(users)

    }
    catch(error){
        res.status(500).json(error)
    }
  }
  exports.getUser=async(req,res)=>{
    try {
        const {id}=req.params
        const user=await User.findOne({_id:id})
        if (!user){
            return res.status(404).json("user not found")
        }
        res.status(200).json(user)

    }
    catch(error){
        res.status(500).json(error)
    }
}