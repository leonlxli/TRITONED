// var models = require("../models");
var mongoose = require('mongoose');

exports.view = function(req, res) {
    if (req.user) {
        // console.log(res);
        if (!req.query.gym || req.query.gym == 'all') {
            mongoose.model('Posts').find({}).sort({
                date: -1
            }).exec(function(err, posts) {
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
                date: -1
            }).exec(function(err, posts) {
                console.log(posts);
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