const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Dog = require('../models/Dog')
const Event = require('../models/Event')

router.get('/events', function (req, res) {
    Event.find({}).exec(function (err, events) {
        if (err) res.send(err)
        else res.send(events)
    })
})

router.get('/event/:eventId', function (req, res) {
    const { eventId } = req.params
    Event.findById(eventId).exec(function (err, event) {
        if (err) res.send(err)
        else res.send(event)
    })
})

router.post('/event', function (req, res) {
    const eventToSave = req.body
    event = new Event(eventToSave)
    event.save()
    res.end()
})

router.put('/event/:eventId', function (req, res) {
    const { eventId } = req.params
    const { info } = req.body
    let event = Event.findById(eventId)
    event = { ...event, ...info }
    Event.findByIdAndUpdate(eventId, event, { new: true })
        .then(updatedEvent => { res.send(updatedEvent) })
})

router.delete('/event/:eventId' , function(req , res ){
    const { eventId } = req.params
    Event.findById(eventId, function (err, event) {
            event.remove(function (err) {
            console.log(err) 
        })
    })
})

module.exports = router;