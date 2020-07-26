const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Dogs = require('../models/Dog')

router.get('/:dogId', function (req, res) {
    const { dogId } = req.params
    Dogs.findById(dogId).exec(function (err, dog) {
        if (err) res.send(err)
        else res.send(dog)
    })
})

router.post('/:userId', function (req, res) {
    const { userId } = req.params
    const dog = new Dogs(req.body)
    dog.save()
    User.findByIdAndUpdate(userId, { $push: { "dogs": dog } })
        .exec(function (err, user) {
            if (err) res.send(err)
            else res.send(user)
        })
})

router.put('/:dogId', function (req, res) {
    const { dogId } = req.params
    const info = req.body
    let dog = Dogs.findById(dogId).exec()
    Dogs.findByIdAndUpdate(dogId, { ...dog, ...info }, { new: true })
        .exec(function (err, dog) {
            if (err) res.send(err)
            else res.send(dog)
        })
})

router.delete('/:dogId', function (req, res) {
    const { dogId } = req.params
    Dogs.findByIdAndDelete(dogId, function (err, dog) {
        if (err) res.send(err) 
        else res.send(`${dog.dogName} has deleted successfully`) 
    })
})

module.exports = router