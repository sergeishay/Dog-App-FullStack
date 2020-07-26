const express = require('express')
const router = express.Router()
const Events = require('../models/Event')

router.get('/', function (req, res) {
    Events.find({}).exec(function (err, events) {
        if (err) res.send(err)
        else res.send(events)
    })
})

router.get('/:eventId', function (req, res) {
    const { eventId } = req.params
    Events.findById(eventId).exec(function (err, event) {
        if (err) res.send(err)
        else res.send(event)
    })
})

router.post('/', function (req, res) {
    const event = new Events(req.body)
    event.save()
    res.send(event)
})

router.put('/:eventId', function (req, res) {
    const { eventId } = req.params
    const info = req.body
    let event = Events.findById(eventId).exec()
    Events.findByIdAndUpdate(eventId, { ...event, ...info }, { new: true })
    .exec(function (err, event) {
        if (err) res.send(err)
        else res.send(event)
    })
})

router.delete('/:eventId', function (req, res) {
    const { eventId } = req.params
    Events.findByIdAndDelete(eventId, function (err, event) {
        if (err) res.send(err) 
        else res.send(`${event.eventName} has deleted successfully`) 
    })
})

module.exports = router