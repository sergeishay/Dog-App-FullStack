const express = require('express');
const path = require("path")
const app = express();
const user = require('./server/routes/user');
const event = require('./server/routes/event');
const dog = require('./server/routes/dog');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

mongoose.connect('mongodb+srv://MayheMatan:Mayhematan123@cluster0-cp7uu.mongodb.net/Dogs-app?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/user', user);
app.use('/users', user);
app.use('/event', event);
app.use('/events', event);
app.use('/dog', dog);
app.use('/dogs', dog);


const port = 3000;
app.listen(port, () => console.log(`Running server on port ${ port }`));