const express=require("express")
const helmet=require("helmet")
const cors=require("cors")
const mongoose = require('mongoose');
const dotenv=require("dotenv")
const Routes=require("./routes/Routes")
dotenv.config()
const app=express()
app.use(helmet());
app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/",Routes);
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected!'));
  app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`)
  })