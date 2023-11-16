const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Routes = require("./routes/Routes");
const socketIO = require("socket.io");

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
app.use((req, res, next) => {
  console.log('Middleware executed');
  req.io = io;
  next();
});

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/", Routes);

// Middleware to make 'io' accessible in routes/controllers


mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected!"));

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.emit("welcome", "Welcome to the chat!",()=>{
    console.log("emitted from sever")
  });
 

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
