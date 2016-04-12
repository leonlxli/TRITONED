(function($) {
    "use strict";
    $('#send_post').submit(function(e) {
        e.preventDefault();

        var message = $('#message_content').val();
        var gym = $('#gym').val();
        $.post('/newPost', {
            message: message,
            gym: gym
        }, function(err, success){
        	console.log(err);
        	console.log(success);
        });
    })
})($);