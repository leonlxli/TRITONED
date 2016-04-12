// var models = require("../models");
var mongoose = require('mongoose');

exports.view = function(req, res) {
    if (req.user) {
    	console.log(req);
        mongoose.model('Posts').find({}).sort({date: -1}).exec(function(err,posts){
        console.log(posts);
		if(err){
			console.log(err);
		}
		else{
	    	res.render("chat", {'newsfeed': posts});
		}
    })
    } else {
        res.redirect("/");
    }
};