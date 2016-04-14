function messageTemplate(template) {
    var result =
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
        '</div>';
    return result;
}

$(document).ready(function() {
    var deleteButtonArray = $('.delete');
    for (var i = 0; i < deleteButtonArray.length; i++) {
        if ($(deleteButtonArray[i]).attr("sameUser") == "true") {
            var commentID = $(deleteButtonArray[i]).attr("commentID");
            console.log(commentID);
            $(deleteButtonArray[i]).append('<button class="btn right blue" value="Delete" commentID=' +
                commentID +
                '>Delete</button>');
        }

    }
});



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
