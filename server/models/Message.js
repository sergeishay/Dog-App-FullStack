const mongoose = require('mongoose')
const Schema = mongoose.Schema


const messageSchema = new Schema({
    
    userId : String,
    name: String,
    input: String,
    time: String
})



const Message = mongoose.model('Message', messageSchema ,)
module.exports = Message