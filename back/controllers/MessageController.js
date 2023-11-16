const bcrypt=require("bcrypt")
// const path=require("path")
const Message=require("../models/Message")
const jwt=require("jsonwebtoken")
exports.SendMsg=async(req,res)=>{
    try {
        const {Sender,Receiver,Content}=req.body
        
        const msg=new Message({
            Sender,
            Receiver,
            Content,
        })
      
        const savedMsg=await msg.save(msg)
        console.log("im here")
        if (req.io) {
            req.io.to(Sender).emit("message", savedMsg);
            console.log("should be here");
            // req.io.to(Receiver).emit("message",savedMsg)
          }
        // req.io.to(Receiver).emit("message",savedMsg)
        res.status(200).json(savedMsg)
     

    }
    catch(error){
        res.status(500).json(error)

    }
}
exports.GetMessagesbetweenUsers=async(req,res)=>{
    try {
        const {Sender,Receiver}=req.body
        const messages=await Message.find({
            $or:[
                { Sender, Receiver },
                { Sender: Receiver, Receiver: Sender },
            ]
        })
        res.status(200).json(messages);
    }
    catch(error){
        console.log(error)

    }
}