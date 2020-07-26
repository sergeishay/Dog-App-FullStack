const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require("path")
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const user = require('./server/routes/user');
const event = require('./server/routes/event');
const dog = require('./server/routes/dog');
const server = http.createServer(app);
const io = socketio(server);

mongoose.connect('mongodb://localhost/dog-app', { useNewUrlParser: true });
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

io.on('connection', socket => {
    console.log('New WS Connection...');

    socket.emit('messege', 'welcome to chatCord') // for a specific client

    socket.broadcast.emit('messege', 'a user has join') // for all clients except the one which is on

    io.emit() //for  all the clients

    socket.on('disconnect', () => {
        io.emit('messege', 'user has left the chat')
    }) //run when client disconnects
});

socket.on('chat-messege', msg => {
    io.emit('messege', msg)
    //render
})

const PORT = 3000 || process.env.PORT;

// app.use('/user', user);
// app.use('/users', user);
// app.use('/event', event);
// app.use('/events', event);
// app.use('/dog', dog);
// app.use('/dogs', dog);


const port = 3000;
server.listen(port, () => console.log(`Running server on port ${ port }`)); ////*************check the documentition/