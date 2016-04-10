var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    "twitterID": String,
    "token": String,
    "username": String,
    "displayName": String,
    "photo": String
});

var postSchema = mongoose.Schema({
  'user': {
    'username': String,
    'photo': String
  },
  'message': String,
  'posted': { type: Date, default: Date.now() },
  "comments": [{ 'photo': String, 'message': String, 'username': String, 'posted': { type: Date, default: Date.now() }}]
});


exports.User = mongoose.model('User', userSchema);
exports.Posts = mongoose.model('Posts', postSchema);
