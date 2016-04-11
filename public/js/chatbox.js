(function($) {
    "use strict";

    var socket = io();
    $('#send_message').submit(function(e) {
        e.preventDefault();

        var $user_input = $('#user_input')
        console.log($user_input.val());
        socket.emit('newsfeed', $user_input.val());
        $user_input.val('');
    })


    $('.comment_form').submit(function(e) {
        e.preventDefault();
        var parent_post_id = $(this).attr("parent")
        console.log("hi");
        // console.log(parent_post_id);
        var $comment = $('#comment_'+parent_post_id);
        socket.emit('newComment', {
            "parent_post_id": parent_post_id,
            "comment": $comment.val()
        });
        $comment.val('');
    })


    socket.on('newComment', function(data) {
        console.log("recieved comment");
        console.log(data);
        var parsedData = JSON.parse(data);
        parsedData.posted = new Date(parsedData.posted);
        $('#' + parsedData.parent_id).append($('<li>').html(commentTemplate(parsedData)));

        function commentTemplate(template) {
            console.log(template);
            var result = '<div class="user">' +
                '<div class="user-image">' +
                '<img src="' + template.photo + '" alt="">' +
                '</div>' +
                '<div class="user-info">' +
                '<span class="username">' + template.username + '</span><br/>' +
                '<span class="posted">' + template.posted + '</span>' +
                '</div>' +
                '</div>' +
                '<div class="message-content">' +
                template.message +
                '</div>';
            return result;
        }
    });

    socket.on('newsfeed', function(data) {
        console.log("newsfeed");
        console.log(data)
        var parsedData = JSON.parse(data);
        parsedData.posted = new Date(parsedData.posted);
        $('#messages').prepend($('<li>').html(messageTemplate(parsedData)));

        function messageTemplate(template) {
            console.log("template:");
            console.log(template);

            var result = '<div class="user">' +
                '<div class="user-image">' +
                '<img src="' + template.user.photo + '" alt="">' +
                '</div>' +
                '<div class="user-info">' +
                '<span class="username">' + template.user.username + '</span><br/>' +
                '<span class="posted">' + template.posted + '</span>' +
                '</div>' +
                '</div>' +
                '<div class="message-content">' +
                template.message +
                '</div> <ul class="comments" id="' +
                template._id + 
                '"></ul>' +
                '<form id="comment_form" action="">' +
                '<input id="comment" placeholder="Type a new message and hit enter!" autocomplete="off" parent="' +
                template._id +
                '" />' +
                '</form>';
            return result;
        }
    });
})($);