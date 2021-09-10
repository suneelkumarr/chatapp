  
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app)
const path = require('path')
const io = require("socket.io")(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    },
});
const port = process.env.PORT || 4000
app.use(cors());
const publicPath = path.join(__dirname,'/public')
app.use(express.static(publicPath))

// var roomno = 1
var clients = 0

io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

    socket.on('disconnect', function () {
        clients--;
        io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
     });
 });





server.listen(port,()=>{
    console.log(`server is running on port no ${port}`)
})