const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventsSchema = new Schema({
    eventName: String,
    eventOwner: [{type: Schema.Types.ObjectId, ref: 'User'}],
    startTime: Number,
    endTime: Number,
    eventLat: Number,
    eventLon: Number,
    participations:[{type: Schema.Types.ObjectId, ref: 'Dogs'}],
    type: String,
    created: false,
    eventPicture: String,
    description: String
})


const Events = mongoose.model('Events', eventsSchema)

module.exports = Events
