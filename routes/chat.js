// var models = require("../models");
var mongoose = require('mongoose');

exports.delete = function(req, res) {
    console.log(req.body.postID);
    mongoose.model('Posts')
        .remove({
            _id: req.body.postID
        }, function(data) {
            res.json({succ:"It worked"});
        });
}

exports.view = function(req, res) {
    if (req.user) {
        // console.log(res);
        if (!req.query.gym || req.query.gym == 'all') {
            mongoose.model('Posts').find({}).sort({
                posted: -1
            }).exec(function(err, posts) {
                for (var i = 0; i < posts.length; i++) {
                    if (posts[i].user.username == req.user.username) {
                        posts[i].sameUser = true;
                    }
                    posts[i].numOfComments = posts[i].comments.length
                }
                if (err) {
                    console.log(err);
                } else if (!req.query.gym) {
                    res.render("chat", {
                        'newsfeed': posts,
                        'select': 'all'
                    });
                } else {
                    res.json({
                        'newsfeed': posts,
                        'select': req.query.gym
                    });
                }
            })
        } else {
            mongoose.model('Posts').find({
                gym: req.query.gym
            }).sort({
                posted: -1
            }).exec(function(err, posts) {
                for (var i = 0; i < posts.length; i++) {
                    if (posts[i].user.username == req.user.username) {
                        posts[i].sameUser = true;
                    }
                }
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        'newsfeed': posts,
                        'select': req.query.gym
                    });
                }
            })
        }

    } else {
        res.redirect("/");
    }
};