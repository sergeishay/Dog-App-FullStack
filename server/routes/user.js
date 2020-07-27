const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', function(req, res) {
    User.find({}).populate("dogs").exec(function(err, users) {
        if (err) res.send(err)
        else res.send(users)
    })
})

router.get('/:userId', function(req, res) {
    const { userId } = req.params
    User.findById(userId).populate("dogs").exec(function(err, user) {
        if (err) res.send(err)
        else res.send(user)
    })
})

router.get('/:userId/dogs', function(req, res) {
    const { userId } = req.params
    User.findById(userId).populate("dogs")
        .exec(function(err, user) {
            if (err) res.send(err)
            else res.send(user.dogs)
        })
})

router.post('/', function(req, res) {
    const newUser = new User(req.body)
    newUser.save().then(user => res.send(user))
})

router.put('/:userId', function(req, res) {
    const { userId } = req.params
    const info = req.body
    let user = User.findById(userId).exec()
    User.findByIdAndUpdate(userId, {...user, ...info }, { new: true })
        .exec(function(err, user) {
            if (err) res.send(err)
            else res.send(user)
        })
})

router.delete('/:userId', function(req, res) {
    const { userId } = req.params
    User.findByIdAndDelete(userId, function(err, user) {
        if (err) res.send(err)
        else res.send(`${user.firstName} ${user.lastName} has deleted successfully`)
    })
})

module.exports = router