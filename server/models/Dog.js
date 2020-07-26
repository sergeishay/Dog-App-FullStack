const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DogsSchema = new Schema({
    
    dogName: String,
    rating: Number,
    weight: Number,
    dogOwner: [{type: Schema.Types.ObjectId, ref: 'User'}],
    favoriteToys : [],
    favoriteTreats:[],
    dogPicture: String
});


const Dogs = mongoose.model('Dogs', DogsSchema);

module.exports = Dogs;
