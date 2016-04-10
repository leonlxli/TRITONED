(function($) {
  "use strict";

  var socket = io();
  $('#send_message').submit(function(e){
    e.preventDefault();

    var $user_input = $('#user_input')
    console.log($user_input.val());
    socket.emit('newsfeed', $user_input.val());
    $user_input.val('');
  })


 $('#comment_form').submit(function(e){
    e.preventDefault();
    console.log("Hello");
    var $comment = $('#comment');
    var parent_post_id = $comment.attr("name");
    socket.emit('newComment', {"parent_post_id": parent_post_id, "comment":$comment.val()});
    $comment.val('');
  })

  // $('#comment_form').submit(function(e){
  //   e.preventDefault();

  //   var $comment = $('#comment');
  //   console.log(comment.val());
  //   socket.emit('comment', $comment.val());
  //   $comment.val('');
  // })

  socket.on('newsfeed', function(data) {
    var parsedData = JSON.parse(data);
    parsedData.posted = new Date(parsedData.posted);

    $('#messages').prepend($('<li>').html(messageTemplate(parsedData)));

    function messageTemplate(template) {
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
        '</div>';
      return result;
    }
  });
})($);