var socket = io();
var xhttp = new XMLHttpRequest();

function appendButton() {

    var deleteButtonArray = $('.delete');
    for (var i = 0; i < deleteButtonArray.length; i++) {
        if ($(deleteButtonArray[i]).attr("sameUser") == "true") {
            var postID = $(deleteButtonArray[i]).attr("postID");
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
}

function addPosts() {
    gym = $("#gymvalue").attr("value");
    console.log(gym)
    $.get('/chat', {
        gym: gym
    }, function(data) {
        console.log(data)
        $('#messages').empty();
        console.log(data);
        for (var i = 0; i < data.newsfeed.length; i++) {
            $('#messages').append($('<div>').html(messageTemplate(data.newsfeed[i])));
        }
        appendButton();
        $('#newMessages').empty();
        document.title = "TRITONED";
    });
}

$('.gymButton').mouseenter(function() {
    if (!$(this).hasClass("selected")) {
        $(this).addClass("hovered");
    }
}).mouseleave(function() {
    $(this).removeClass("hovered");
}).click(function() {
    var buttons = $('.gymButton');
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i] != this) {
            $(buttons[i]).removeClass("selected")
        } else {
            console.log($(buttons[i]).attr("me"));
            $(buttons[i]).addClass("selected")
            $(buttons[i]).removeClass("hovered")
            $('#gymvalue').attr("value", $(buttons[i]).attr("me"));
            $('#newMessages').empty();
            document.title = "TRITONED";

        }
    }


});

$(document).ready(function() {
    $('.modal-trigger').leanModal();
    $('select').material_select();
    appendButton();
    var comments = $('.comments');
    for (var i = 0; i < comments.length; i++) {
        var numOfComments = $(comments[i]).attr("value");
        if (numOfComments == 1) {
            $(comments[i]).html(numOfComments + ' comment')
        } else {
            $(comments[i]).html(numOfComments + ' comments')
        }
    }
    $("#all").addClass("selected");

});

function deletePostModal(postID) {
    console.log("test");
    $('#modal' + postID).openModal();
}

function deletePost(postID) {
    $.post('/chat/delete', {
        postID: postID,
    }, function(data, succ) {
        if (data.succ) {
            // console.log(data)
            $("#post" + postID).remove();
        }
    })
}


function gymChange(e) {
    var gym = e.getAttribute("value");
    console.log(gym);
    // var data = new FormData();
    // window.location.href = url;
    // data.append('gym', gym);
    $.get('/chat', {
        gym: gym
    }, function(data) {
        console.log(data);
        $('#messages').empty();
        for (var i = 0; i < data.newsfeed.length; i++) {
            $('#messages').append($('<div>').html(messageTemplate(data.newsfeed[i])));
        }
        appendButton();
    });
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
        '<div class="row center-block" id="post{{_id}}">' +
        '<div class="col s12">' +
        '<div class="card white">' +
        '<div class="card-content black-text">' +
        '<img src="' + template.user.photo + '" />' +
        '<p><b>' + template.user.username + '</b> posted on ' + template.posted + ':</p>' +
        '<div class="card-title">' +
        '<h2>' + template.message + '</h2>' +
        '<p><i>' + template.gym + '</i></p>' +
        '</div>' +
        '</div>' +
        '<div class="card-action">' +
        '<a href="/comments?postID={{_id}}" class="btn blue darken-3 left comments" postID="{{_id}}">' + template.comments.length + ' comments</a>' +
        '<div class="delete" sameUser="' + template.sameUser + '" postID="{{_id}}">' +
        '</div>' +
        '</div>' +
        '<br>' +
        '<br />' +
        '<div id="modal{{_id}}" class="modal">' +
        '<div class="modal-content">' +
        '<h4>Delete post?</h4>' +
        '<p>Are you sure you want to delete this post? Click "DELETE" below to delete this post or cancel to go back.</p>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<a class="modal-action modal-close btn blue darken-3 right" href="#" rel="nofollow">DELETE</a>' +
        '<a class="modal-action modal-close btn blue darken-3 left">CANCEL</a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';*/
    var result =
        '<div class="row center-block" id="post' + template._id + '">' +
        '<div class="col s10 offset-s1">' +
        '<div class="card white">' +
        '<div class="card-content black-text">' +
        '<img style="vertical-align:middle;" src="' + template.user.photo + '" />' +
        '<b>  ' + template.user.username + '</b><span class="username"> posted about <a class="blue-text"><i>' + template.gym + '</i></a> on ' + template.posted + ':</p></span>' +
        '<div class="card-title">' +
        '<p>' + template.message + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="card-action">' +
        '<a href="/comments?postID=' + template._id + '" class="btn blue darken-3 left comments" postID="' + template._id + '">' + template.comments.length + ' comments</a>' +
        '<div class="delete" sameUser="' + template.sameUser + '" postID="' + template._id + '">' +
        '</div>' +
        '</div>' +
        '<br>' +
        '<div id="modal' + template._id + '" class="modal">' +
        '<div class="modal-content">' +
        '<h4>Delete post?</h4>' +
        '<p>Are you sure you want to delete this post? Click "DELETE" below to delete this post or cancel to go back.</p>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<a class="modal-action modal-close btn blue darken-3 right delBtn" postID="' + template._id + '" onclick="deletePost(\'' + template._id + '\')" rel="nofollow" style="margin-left:40px">DELETE</a>&nbsp;&nbsp;&nbsp;' +
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


    socket.on('online', function(data) {
        // $('#usersOnline').html(data.online);
    });

    socket.on('newsfeed', function(data) {
        console.log("socket=======");
        if ($("#newMessages").children().length == 0) {
            console.log($("#gymvalue").attr("value"));
            var dat = JSON.parse(data);
            console.log(dat.post.gym);
            if ($("#gymvalue").attr("value") == 'all' || $("#gymvalue").attr("value") == dat.post.gym) {
                $('#newMessages').append($('<div id="messBtn">').html('<a id="newMessage" class="btn blue darken-3 row center-block" onclick="addPosts()">Load new posts</a>'));
                document.title = "TRITONED (new)";
            }
        }

    });
})($);