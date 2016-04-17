var models = require('../models');
var mongoose = require('mongoose');
var dateFormat = require('dateformat');


exports.view = function(req, res) {
    if (req.user) {
        // console.log(req.user);
        // console.log(req.user._json.profile_image_url)
        res.render("newPost", {
            'profPic': req.user._json.profile_image_url
        });
    } else {
        res.redirect("/");
    }
};

exports.post = function(req, res) {
    console.log(req.body);
    var now = new Date();
    var date = dateFormat(now, "h:MM TT, dddd, mmmm dS, yyyy");
    console.log(typeof(date));
    if (req.user) {
        var newPost = new models.Posts({
            'gym': req.body.gym,
            'message': req.body.message,
            'user': {
                'username': req.user.username,
                'photo': req.user.photos[0].value
            },
            'posted': date,
            'comments': [],
        });
        newPost.save(function(err, suc) {
            if (err) {
                console.log(err);
                res.json({
                    'error': err
                })
            } else {
                res.json({
                    'post': suc
                })
            }
        })
    } else {
        res.json({
            'error': 'Not logged in'
        })
    }
}