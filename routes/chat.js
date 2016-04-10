// var models = require("../models");

exports.view = function(req, res) {
    /* TODO */
    if (req.user) {
        res.render("chat");
    } else {
        res.redirect("/");
    }
};