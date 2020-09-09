// functions

// create a function that generate a random number => randomNumber(min, max)
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// create a function that send a message in the chat with the value of the input => sendMessage()
function sendMessage() {
  if ($(".chat-input__input").val() != "") {

    var templateSend = $("ul.template .chat__li--send").clone();
    var msg = $(".chat-input__input").val();

    $(".chat-input__input").val("");

    templateSend.prepend(msg);
    templateSend.appendTo("ul.chat");

    var delay = randomNumber(800, 3000);
    recMessage("ok", delay);
  }
}

// create a function that receive a message in the chat with "text" after "time" in ms => recMessage("text", time)
function recMessage(text, time) {
  setTimeout(function() {
    var templateSend = $("ul.template .chat__li--rec").clone();
    var msg = text;

    templateSend.prepend(msg);
    templateSend.appendTo("ul.chat");

  }, time);
}

// script

$(document).ready(
  function () {

  $("#send-message").click(sendMessage);

  $(".chat-input__input").keyup(function(e) {
    if (e.which == 13 && $(".chat-input__input").val() != "") {
      sendMessage();
    }
  })

});
