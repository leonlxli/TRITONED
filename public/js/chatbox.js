var socket = io();
var xhttp = new XMLHttpRequest();

$(document).ready(function() {
    $('.modal-trigger').leanModal();
    $('select').material_select();

    var deleteButtonArray = $('.delete');
    for (var i = 0; i < deleteButtonArray.length; i++) {
        if ($(deleteButtonArray[i]).attr("sameUser") == "true") {
            var postID = $(deleteButtonArray[i]).attr("postID");
            console.log(postID);
            /*$(deleteButtonArray[i]).append('<button value="Delete" postID=' +
                postID +
                '>Delete</button>');*/
            $(deleteButtonArray[i]).append(
                '<button class="btn blue darken-3 white-text right" href="#" onclick="deletePostModal(\'' + postID + '\')" postID=' +
                postID +
                '>delete</a>'
            );
        }

    }
});

function deletePostModal(postID) {
    console.log("test");
    $('#modal'+postID).openModal();
}

function deletePost(postID){
    $.post('/chat/delete', {
        postID: postID,
    }, function(data, succ) {
        if(data.succ){
            // console.log(data)
            $("#post"+postID).remove();
        }
    })
}

function gymChange() {
    console.log("Hello");
    var myselect = document.getElementById("current_gym");
    var gym = myselect.options[myselect.selectedIndex].value;
    var data = new FormData();
    var url = '/chat?gym=' + gym;
    // window.location.href = url;
    data.append('gym', gym);
    $.get('/chat', {
        gym: gym
    }, function(data) {
        $('#messages').empty();
        for (var i = 0; i < data.newsfeed.length; i++) {
            $('#messages').append($('<div>').html(messageTemplate(data.newsfeed[i])));
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
    /*var result =
      '<div class="row center-block">' +
       '<div class="col s12">' +
         '<div class="card white">' +
           '<div class="card-content black-text">' +
             '<h2 class="card-title">' + template.message + '</h2>' +
             '<img src="' + template.user.photo + '"/>' +
             '<p>' + template.user.username + '</p>' +
             '<p>' + template.posted + '</p>' +
           '</div>' +
           '<div class="card-action">' +
             '<a href="/comments?postID={{_id}}" class ="black-text comments left" postID="{{_id}}">comments</a>' +
             '<a class="black-text right" href="#">delete</a>' +
           '</div>' +
           '<br />' +
         '</div>' +
       '</div>' +
     '</div>';*/

    var result =
        '<div class="row center-block">' +
        '<div class="col s12">' +
        '<div class="card white">' +
        '<div class="card-content black-text">' +
        '<div class="card-title">' +
        '<h2>' + template.message + '</h2>' +
        '<p>' + template.gym + '</p>' +
        '</div>' +
        '<img src="' + template.user.photo + '"/>' +
        '<p>' + template.user.username + '</p>' +
        '<p>' + template.posted + '</p>' +
        '</div>' +
        '<div class="card-action">' +
        '<a href="/comments?postID={{_id}}" class="btn blue darken-3 left comments" postID="{{_id}}">' + template.comments.length + ' comments</a>' +
        '<button class="btn blue darken-3 white-text right" href="#" onclick="deletePost()" postID="{{_id}}">delete</a>' +
        '</div>' +
        '<br>' +
        '<br />' +
        '<div id="modal1" class="modal">' +
        '<div class="modal-content">' +
        '<h4>Delete post?</h4>' +
        '<p>Are you sure you want to delete this post? Click "DELETE" below to delete this post or cancel to go back.</p>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<a class="modal-action modal-close btn blue darken-3 right" href="/post?id={{_id}}" rel="nofollow">DELETE</a>' +
        '<a class="modal-action modal-close btn grey lighten-1 right">CANCEL</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
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
        $('#messages').prepend($('<div>').html(messageTemplate(parsedData)));
    });
})($);