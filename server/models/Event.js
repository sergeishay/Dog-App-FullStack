const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventsSchema = new Schema({
    eventName: String,
    eventOwner: { type: Schema.Types.ObjectId, ref: 'User' },
    startTime: String,
    endTime: String,
    eventDate: Date,
    participations: [{ type: Schema.Types.ObjectId, ref: 'Dogs' }],
    type: String,
    created: false,
    eventPicture: String,
    description: String,
    address: String
})


const Events = mongoose.model('Events', eventsSchema)

module.exports = Events