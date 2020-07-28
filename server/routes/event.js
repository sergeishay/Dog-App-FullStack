const express = require('express')
const router = express.Router()
const Events = require('../models/Event')
const User = require('../models/User')

router.get('/', function(req, res) {
    Events.find({}).populate("participations eventOwner").exec(function(err, events) {
        if (err) res.send(err)
        else res.send(events)
    })
})

router.get('/:eventId', function(req, res) {
    const { eventId } = req.params
    Events.findById(eventId).exec(function(err, event) {
        if (err) res.send(err)
        else res.send(event)
    })
})

router.post('/', function(req, res) {
    const event = new Events(req.body)
    event.save()
    res.end()
})

router.put('/:eventId', function(req, res) {
    const { eventId } = req.params
    const user = req.body
    Events.findByIdAndUpdate(eventId, { $push: { participations: user } })
})

router.delete('/:eventId', function(req, res) {
    const { eventId } = req.params
    Events.findByIdAndDelete(eventId, function(err, event) {
        if (err) res.send(err)
        else res.send(`${event.eventName} has deleted successfully`)
    })
})

module.exports = router