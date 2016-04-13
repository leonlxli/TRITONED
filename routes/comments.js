var models = require("../models");
var mongoose = require('mongoose');

exports.view = function(req, res) {
    if (req.user) {
        console.log("helooooo")
        console.log(req.query);
        mongoose.model('Posts').find({
            _id: req.query.postID
        }, function(err, posts) {
            if (err) {
                console.log(err);
            } else {
                console.log(posts);
                res.render("comments", posts[0]);
            }
        })
    } else {
        res.redirect("/");
    }
};

exports.post = function(req, res) {
    // console.log("posting");
    // console.log(req.body);
    mongoose.model('Posts').findOne({
        _id: req.body.post_id
    }, function(err, posts) {
        console.log(posts);
        if (err) {
            console.log(err);
        } else {
            console.log("user is ============")
            console.log(req.user)
            posts.comments.push({
                'photo': req.user.photos[0].value,
                'message': req.body.comment,
                'username': req.user.username,
                'posted': Date.now(),
            })
            posts.save();
            // console.log("saved -----------------")
            // console.log(posts);
            res.json({
                'photo': req.user.photos[0].value,
                'message': req.body.comment,
                'username': req.user.username,
                'posted': Date.now(),
            });
        }
    })
};