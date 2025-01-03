const express=require('express');
const app=express();
const http=require('http');
const path = require('path');

app.use(express.json());
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

const server=http.createServer(app);
const io=require('socket.io')(server);

let container=[];

io.on("connection",(socket)=>{
   if(container.length > 0) {
    let otherSocketId=container.shift();
    const roomName = `${socket.id}-${otherSocketId}`;
    
    socket.join(roomName);
    io.sockets.sockets.get(otherSocketId).join(roomName); 

    socket.emit('matched', JSON.stringify(
      { room: roomName, 
        otherUser: otherSocketId, 
        temp:false
      }));
    io.to(otherSocketId).emit('matched',JSON.stringify( 
      { room: roomName, 
        otherUser: socket.id,
        temp:true
      }));
   }else{
    container.push(socket.id);
   }

   socket.on("move",(data)=>{
      const {index,room}=JSON.parse(data);
      socket.broadcast.to(room).emit("step", JSON.stringify({
        index,
      }));
   })

   socket.on("disconnect",()=>{
    const ind=container.indexOf(socket.id);
    if(ind > -1) container.splice(ind,1);
   })
});

app.get("/",(req,res)=>{
  res.render("index.ejs");
})

server.listen(3000,()=>{
  console.log("http://localhost:3000");
});
