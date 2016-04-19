exports.view = function(req, res) {
	console.log("invalid");
    res.render("invalid", {});
};

exports.invalidOther = function(req, res) {
    res.redirect('/invalid');
};


// exports.getUser = function(req, res) {
// 	console.log("redirect");
//     if (req.user) {
//     	res.redirect('/chat');
//     }else{
//     	res.redirect('/');
//     }
// };