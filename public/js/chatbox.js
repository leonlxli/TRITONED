(function($) {
  "use strict";

  var socket = io();
  $('#send_message').submit(function(e){
    e.preventDefault();

    var $user_input = $('#user_input')
    socket.emit('newsfeed', $user_input.val());
    $user_input.val('');
  })

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