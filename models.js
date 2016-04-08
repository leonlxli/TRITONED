var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    "twitterID": String,
    "token": String,
    "username": String,
    "displayName": String,
    "photo": String
});

exports.User = mongoose.model('User', userSchema);