const mongoose=require("mongoose")
const MessageSchema=mongoose.Schema({
    Sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    Receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    Content: {
        type: String,
        required: true,
       
      },
      timestamp:{
        type:Date,
        required:true,
        default:Date.now
      },

})
const Message=mongoose.model("Message",MessageSchema)
module.exports=Message