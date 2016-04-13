var socket = io();
var xhttp = new XMLHttpRequest();

// $( document ).ready(function() {
//     $("#current_gym").val('Gateway 2');
// });

function gymChange() {
    console.log("Hello");
    var myselect = document.getElementById("current_gym");
    var gym = myselect.options[myselect.selectedIndex].value;
    var data = new FormData();
    var url = '/chat?gym='+gym;
    // window.location.href = url;
    data.append('gym', gym);
    $.get('/chat', {
        gym: gym
    }, function(data) {
        $('#messages').empty();
        for (var i = 0; i < data.newsfeed.length; i++) {
            $('#messages').append($('<li>').html(messageTemplate(data.newsfeed[i])));
        }
    });

    // socket.emit('getGym', gym);

}

// $(".comments").click(function() {
//     var postID = $(this).attr("postID");
//     $.get('/comments', {
//         postID: postID
//     }, function(html, succ){
//         // 
//     });

// });

function messageTemplate(template) {
    var result =
        '<hr>' +
        '<div class="user">' +
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
        '</div>'+
        '<a href="/comments?postID='+template._id +
        '" class ="comments" postID="' + 
        template._id +
        '"">comments </a>';
    return result;
}

(function($) {
    "use strict";

    $('#send_message').submit(function(e) {
        e.preventDefault();

        var $user_input = $('#user_input')
        console.log($user_input.val());
        socket.emit('newsfeed', $user_input.val());
        // $user_input.val('');
    })


    // $('.comment_form').submit(function(e) {

    //     e.preventDefault();
    //     var parent_post_id = $(this).attr("parent")
    //     console.log("hi");
    //     // console.log(parent_post_id);
    //     var $comment = $('#comment_'+parent_post_id);
    //     socket.emit('newComment', {
    //         "parent_post_id": parent_post_id,
    //         "comment": $comment.val()
    //     });
    //     $comment.val('');
    // })


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
    });
})($);