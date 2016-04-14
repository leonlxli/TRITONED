function messageTemplate(template) {
    /*var result =
        '<hr>' +
        '<div class="user">' +
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
        '</div>';*/

    var result =
      '<hr>' +
      '<li class="card white">' +
          '<div class="card-content black-text">' +
              '<div class="message-content">' +
                  '<h5>' + template.message + '</h5>' +
              '</div>' +
              '<div class="user">' +
                  '<div class="user-image">' +
                      '<img src="' + template.photo + '" alt="">' +
                  '</div>' +
                  '<div class="user-info">' +
                      '<span class="username">' + template.username + '</span>' +
                      '<br/>' +
                      '<span class="posted">' + new Date(template.posted) + '</span>' +
                  '</div>' +
              '</div>' +
              '<button class="btn right blue darken-3" value="Delete" commentID={{_id}}' +
              '>Delete</button>' +
              '<br>' +
              '<br>' +
          '</div>' +
      '</li>';
    return result;
}



function deleteComment(commentID) {
    var postID = $("#originalPost").attr("postID");
    $.post('/comments/delete', {
        postID: postID,
        commentID: commentID
    }, function(data, succ) {
        if(data.succ){
            $("#comment"+commentID).remove();
        }
    })
}

function deleteCommentModal(commentID) {
    $('#modal' + commentID).openModal();

}

$('#send_comment').submit(function(e) {
    e.preventDefault();

    var comment_content = $('#comment_content').val();
    var original_postID = $('#comment_content').attr("parent");
    $.post('/comments', {
        comment: comment_content,
        post_id: original_postID
    }, function(my_comment) {
        console.log(my_comment)
        $('#comments').append($('<li>').html(messageTemplate(my_comment)));
        $('#comment_content').val('');
    });
    // $user_input.val('');
})

$(document).ready(function() {
    $('select').material_select();
    $('.modal-trigger').leanModal();
    console.log("ready");
    var deleteButtonArray = $('.delete');
    console.log(deleteButtonArray);
    for (var i = 0; i < deleteButtonArray.length; i++) {
        if ($(deleteButtonArray[i]).attr("sameUser") == "true") {
            var commentID = $(deleteButtonArray[i]).attr("commentID");
            console.log(commentID);
            $(deleteButtonArray[i]).append(
                '<button class="btn blue darken-3 white-text right" href="#" onclick="deleteCommentModal(\'' + commentID + '\')">delete</a>'
            );
        }
    }
});
