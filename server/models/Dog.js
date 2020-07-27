const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dogsSchema = new Schema({
    
    dogName: String,
    rating: Number,
    weight: Number,
    dogOwner: [{type: Schema.Types.ObjectId, ref: 'User'}],
    favoriteToy : String,
    favoriteTreat: String,
    dogPicture: String,
    breed: String
})


const Dogs = mongoose.model('Dogs', dogsSchema)
module.exports = Dogs
