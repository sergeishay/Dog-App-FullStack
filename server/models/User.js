const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName : String, 
    lastName: String,
    dogs :[{type: Schema.Types.ObjectId, ref: 'Dogs'}],
    email: String,
    password : String,
    event:[{type: Schema.Types.ObjectId, ref: 'Events'}],
    aboutMe: String,
    userPicture  : String,
    radius: Number,
    userLat: Number,
    userLon: Number
});




const User = mongoose.model('User', UserSchema);

module.exports = User;
