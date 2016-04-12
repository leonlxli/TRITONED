var mongoose = require('mongoose');

exports.view = function(req, res) {
    if (req.user) {
        mongoose.model('Posts')
                .find({})
                .sort({posted: -1})
                .exec(function(err, posts) {
                  console.log(posts);
		              (err) ? console.log(err) : res.render("chat", {'newsfeed': posts});
                });
    }
    else res.redirect("/");
};
