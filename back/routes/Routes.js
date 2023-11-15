const express=require("express")
const router=express.Router()
const UserController=require("../controllers/UserController")
const MessageController=require("../controllers/MessageController")
const validateToken=require("../middleware/authentication")
//Messages
router.post("/msg/send",MessageController.SendMsg)
router.post("/msg/all",MessageController.GetMessagesbetweenUsers)
//photo

//user
router.post("/user/register",UserController.Register)
router.post("/user/login",UserController.Login)
router.get("/user/all",UserController.GetAllUsers)
router.get("/user/profile/:id",validateToken,UserController.getUser)
module.exports=router;