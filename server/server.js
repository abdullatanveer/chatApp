 const express=require("express");
 const app=express();
 const cors=require("cors");
 const http=require('http');
 
  
const {Server}=require("socket.io");
 

 app.use(cors());

 const server=http.createServer(app);

const io=new Server(server
    ,{
    cors:{
        origin:"http://localhost:5174",
        methods:["GET","POST"],
    }

 }
)
 

 io.on('connection',(socket)=>{
    console.log( "user connected",socket.id);
 
 socket.on("join_room",(data)=>{
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room of id :${data}`)
})
   
  socket.on("send_message",(data)=>{
     socket.to(data.room).emit("recieve_message",data);
  })
 
 

 socket.on('disconnect',(socket)=>{
    console.log( "user disconnected",socket.id);
 })
})
server.listen(3000,()=>{
    console.log(`Server is listneing on 3000`)
})