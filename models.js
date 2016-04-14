var mongoose = require('mongoose');

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

    'user': {
        'username': String,
        'photo': String
    },
    'message': String,
    'posted': {
        type: Date,
        default: Date.now()
    },
    'comments': [{
        'sameUser': {
            type: Boolean,
            default: false
        },
        'photo': String,
        'message': String,
        'username': String,
        'posted': {
            type: Date,
            default: Date.now()
        }
    }],
    'numOfComments': Number,
    'notification': String
});

exports.User = mongoose.model('User', userSchema);
exports.Posts = mongoose.model('Posts', postSchema);