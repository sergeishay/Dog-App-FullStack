const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dogsSchema = new Schema({
    
    dogName: String,
    rating: Number,
    weight: Number,
    dogOwner: [{type: Schema.Types.ObjectId, ref: 'User'}],
    favoriteToys : [],
    favoriteTreats:[],
    dogPicture: String
})


const Dogs = mongoose.model('Dogs', dogsSchema)
module.exports = Dogs
