(function($) {
    "use strict";
    $('#send_post').submit(function(e) {
        e.preventDefault();

        var message = $('#message_content').val();
        var gym = $('#gym').val();
        $.post('/newPost', {
            message: message,
            gym: gym
        }, function(err, success){
        	console.log(err);
        	console.log(success);
        });
    })
})($);


// Get the modal
var modal = document.getElementById('myModal');
var errmodal = document.getElementById('errModal');
// Get the button that opens the modal
var btn = document.getElementById("submitnewpost");
// Get the elements that closes the modal
var span = document.getElementsByClassName("cancelBtn")[0];
var okBtn = document.getElementById("okBtn");
// When the user clicks on the button, open the modal 
btn.onclick = function() {
    
    var message = $('#message_content').val();
    var gym = $('#gym').val();

    if (message != "") {
        if (gym == "Rimac" || gym == "CanyonView" || gym == "Main_Gym") {
            $('#postMessage').append("'" + message + "'" + " to " + gym + "?");
            modal.style.display = "block";
        }
        else {
            //need to choose a gym
            console.log("error module displayed")
            errmodal.style.display = "block";
        }
    }
    else {
        //built in error message with css
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