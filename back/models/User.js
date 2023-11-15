const mongoose=require("mongoose")
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/, // Regular expression for email format validation
      },
      password:{
        type:String,
        required:true
      },

})
const User=mongoose.model("User",UserSchema)
module.exports=User