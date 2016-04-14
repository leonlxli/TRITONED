var models = require("../models");
var mongoose = require('mongoose');

exports.view = function(req, res) {
    if (req.user) {
        console.log("helooooo")
        console.log(req.query);
        mongoose.model('Posts').findOne({
            _id: req.query.postID
        }, function(err, post) {
            if (err) {
                console.log(err);
            } else {

                for (var i = 0; i < post.comments.length; i++) {
                    console.log(i);
                    if (post.comments[i].username == req.user.username) {
                        post.comments[i].sameUser = true;
                        console.log(post.comments[i]);
                    }
                }
                res.render("comments", post);
            }
        })
    } else {
        res.redirect("/");
    }
};

exports.delete = function(req, res) {
    mongoose.model('Posts').findOne({
        _id: req.body.postID
    }, function(err, post) {
        for(var i =0; i<post.comments.length;i++){
            if(post.comments[i]._id==req.body.commentID){
                post.comments.splice(i, 1);
            }
        }
        post.save();
        res.json({succ:post.comments});
    })
}

exports.post = function(req, res) {
    // console.log("posting");
    // console.log(req.body);
    mongoose.model('Posts').findOne({
        _id: req.body.post_id
    }, function(err, posts) {
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

            // console.log(/posts.comments[posts.comments.length-1]._id)
            posts.save();
            // console.log("saved -----------------")
            // console.log(posts);
            res.json({
                'photo': req.user.photos[0].value,
                'message': req.body.comment,
                'username': req.user.username,
                'posted': Date.now(),
                'commentID': posts.comments[posts.comments.length-1]._id
            });
        }
    })
};