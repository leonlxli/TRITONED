var socket = io();
var xhttp = new XMLHttpRequest();

function appendButton() {

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
}

$(document).ready(function() {
    $('.modal-trigger').leanModal();
    $('select').material_select();
    appendButton();
    var comments = $('.comments');
    for (var i=0; i < comments.length;i++){
        var numOfComments = $(comments[i]).attr("value");
        if(numOfComments==1){
            $(comments[i]).html(numOfComments+' comment')
        }
        else{
            $(comments[i]).html(numOfComments+' comments')
        }
    }
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
            console.log(data.newsfeed[i]);
            $('#messages').append($('<div>').html(messageTemplate(data.newsfeed[i])));
        }
        appendButton();
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
      '<div class="row center-block" id="post{{_id}}">' +
          '<div class="col s12">' +
              '<div class="card white">' +
                  '<div class="card-content black-text">' +
                      '<img style="vertical-align:middle;" src="' + template.user.photo + '" />' +
                      '<span><b>  ' + template.user.username + '</b> posted in <a class="blue-text"><i>' + template.gym + '</i></a> on ' + template.posted + ':</p></span>' +
                      '<div class="card-title">' +
                          '<p>' + template.message + '</p>' +
                      '</div>' +
                  '</div>' +
                  '<div class="card-action">' +
                      '<a href="/comments?postID=' + template._id + '" class="btn blue darken-3 left comments" postID="{{_id}}">' + template.comments.length + ' comments</a>' +
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
                          '<a class="modal-action modal-close btn blue darken-3 right delBtn" postID="{{_id}}" onclick="deletePost(\'' + template._id + '\')" rel="nofollow" style="margin-left:40px">DELETE</a>&nbsp;&nbsp;&nbsp;' +
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


    socket.on('online', function(data) {
        // $('#usersOnline').html(data.online);
    });

    socket.on('newsfeed', function(data) {
        console.log("newsfeed");
        console.log(data)
        var parsedData = JSON.parse(data);
        parsedData.posted = new Date(parsedData.posted);
        $('#messages').prepend($('<div>').html(messageTemplate(parsedData)));
    });
})($);
