const express = require('express');
const path = require("path")
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const router = express.Router();
const User = require('../models/User')

router.get('/dog/:dogId', function (req, res) {
    const { dogId } = req.params
    Dog.findById(dogId).exec(function (err, dog) {
        if (err) res.send(err)
        else res.send(dog)
    })
})

router.get('/dogs/:userId', function (req, res) {
    const { userId } = req.params
    User.findById(userId).populate("users")
        .exec(function (err, user) {
            if (err) res.send(err)
            else res.send(user.dogs)
        })
})

router.post('/dog/:userId', function (req, res) {
    const { userId } = req.params
    const dogToSave = req.body
    dog = new Dog(dogToSave)
    dog.save()
    User.findById(userId).exec(function (err, user) {
        if (err) res.send(err)
        else {
            user.dogs.push(dog)
            user.save()
        }
        res.end()
    })
})


router.put('/dog/:dogId', function (req, res) {
    const { dogId } = req.params
    const { info } = req.body
    let dog = Dog.findById(dogId)
    dog = { ...dog, ...info }
    Dog.findByIdAndUpdate(dogId, dog, { new: true })
        .then(updatedDog => {
            res.send(updatedDog)
        })
})

module.exports = router;