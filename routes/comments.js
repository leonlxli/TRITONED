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
    console.log("posting");
};