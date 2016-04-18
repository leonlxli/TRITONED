var socket = io();


(function($) {
    "use strict";

    $('#send_post').submit(function(e) {
        e.preventDefault();

        var message = $('#message_content').val();
        var gym = $('#gym').val();
        $.post('/newPost', {
            message: message,
            gym: gym
        }, function(data, success) {
            console.log("emitting");
            console.log(data);
            socket.emit('newsfeed', data);
        });
    })
})($);


// Get the modal
var modal = document.getElementById('myModal');
var errmodal = document.getElementById('errModal');
var errmodalmsg = document.getElementById('errModalmsg');
// Get the button that opens the modal
var btn = document.getElementById("submitnewpost");
// Get the elements that closes the modal
var span = document.getElementsByClassName("cancelBtn")[0];
var okBtn = document.getElementById("okBtn");
var okBtn2 = document.getElementById("okBtn2");
// When the user clicks on the button, open the modal
btn.onclick = function() {
        console.log("heloooo");
        var message = $('#message_content').val();
        var gym = $('#gym').val();
        console.log(gym)

        if (message != "") {
            if (gym == "Rimac" || gym == "Canyon View Gym" || gym == "Main Gym") {
                $('#postMessage').append("'" + message + "'" + " to " + gym + "?");
                modal.style.display = "block";
            } else {
                //need to choose a gym
                console.log("error module displayed")
                errmodal.style.display = "block";
                $('#errModal').leanModal();
            }
        } else {
            errmodalmsg.style.display = "block";
        }
    }
    // When the user clicks on <span> (x), close the modal
span.onclick = function() {
    $('#postMessage').text("Are you sure you want to post: ");
    modal.style.display = "none";
}
okBtn.onclick = function() {
    console.log("ok button pressed");
    errmodal.style.display = "none";
}
okBtn2.onclick = function() {
    console.log("ok button pressed");
    errmodalmsg.style.display = "none";
}


function redirect() {
    console.log('redirecting...');
    window.location.href = '/chat';
}

$('.gymImg').mouseenter(function() {
    if (!$(this).hasClass("selected")) {
        $(this).addClass("hovered");
    }
}).mouseleave(function() {
    $(this).removeClass("hovered");
}).click(function() {
    var buttons = $('.gymImg');
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i] != this) {
            $(buttons[i]).removeClass("selected")
        } else {
            $(buttons[i]).addClass("selected")
            $(buttons[i]).removeClass("hovered")
        }
    }
});

$('.gymButtonChoose').click(function() {
    $("#gym").val($(this).val());
});