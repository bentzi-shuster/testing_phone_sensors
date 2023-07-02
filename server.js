// make an express server and use socket.io
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); // pass in the server to socket.io
const port = process.env.PORT || 3000;
const path = require('path');
// serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
// when a client connects, do this
io.on('connection', function (socket) {

    // when a message is received, send it to all other clients
    socket.on('AOSdata', function (data) {
        console.log('Message received', data);
        socket.broadcast.emit('AOSdata', data);
    });
socket.on('GYdata', function (data) {
        console.log('Message received', data);
        socket.broadcast.emit('GYdata', data);
    }
);
 
});
// start the server
server.listen(port, function () {
    console.log('Server started on port ' + port);
});
