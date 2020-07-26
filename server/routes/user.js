const express = require('express');
const path = require("path")
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const router = express.Router();
const User = require('../models/User')
const axios = require('axios');


router.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.send(users)
    })
        .catch(function (error) {
            console.log(error)
        })
});

router.get('/user/:userId', function (req, res) {
    let { userId } = req.params
    User.findById(userId).exec((err, user) => {
        if (err) {
            res.send(err)
            console.log("Error")
        }
        res.send(user)
    })
})

router.get('/user/:userId/dogs', function (req, res) {
    let { userId } = req.params
    User.findById(userId).populate("dogs").then(user => res.send(user.dogs));
})

router.post('/user', function (req, res) {
    const { user } = req.body
    const newUser = new User(user)
    newUser.save()
    res.send(newUser)
});


router.put('/user/:userId', async function (req, res) {
    const { userId } = req.params
    const { info } = req.body
    let user = await User.findById(userId)
    user = { ...user, ...info }
    User.findByIdAndUpdate(userId, user, { new: true }).exec().then(updatedUser => {
        res.send(updatedUser)
    })
});

router.delete('/user/:userId' , async function(req , res ){
    const { userId } = req.params
    User.findById(userId, function (err, user) {
        user.remove(function (err) {
            console.log(err) 
        })
    })
})



module.exports = router;