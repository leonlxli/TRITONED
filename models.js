var mongoose = require('mongoose');
var dateFormat = require('dateformat');

var userSchema = mongoose.Schema({
    'twitterID': String,
    'token': String,
    'username': String,
    'displayName': String,
    'photo': String,
    'active_sessions': {
        type: Number,
        default: 0
    }
});

var postSchema = mongoose.Schema({
    'gym': String,
    'sameUser': {
        type: Boolean,
        default: false
    },
    "timeSinceE": Number,
    'user': {
        'username': String,
        'photo': String
    },
    'message': String,
    'posted': String,
    'comments': [{
        "timeSinceE": Number,
        'sameUser': {
            type: Boolean,
            default: false
        },
        'photo': String,
        'message': String,
        'username': String,
        'posted': String
    }],
    'numOfComments': Number,
    'notification': String
});

exports.User = mongoose.model('User', userSchema);
exports.Posts = mongoose.model('Posts', postSchema);