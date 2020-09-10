// functions

// create a function that generate a random number => randomNumber(min, max)
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// create a function that send a message in the chat with the value of the input => sendMessage()
function sendMessage() {
  if ($(".chat-input__input").val() != "") {
    var clock = new Date;
    var hours = clock.getHours();
    var minutes = clock.getMinutes();

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    var templateSend = $("ul.template .chat__li--send").clone();
    var msg = $(".chat-input__input").val();
    clock = hours + ":" + minutes;

    $(".chat-input__input").val("");
    $(".chat-input__send").addClass("d_none");
    $(".chat-input__microphone").removeClass("d_none");

    templateSend.prepend(msg);
    templateSend.children("span").text(clock);
    templateSend.appendTo("ul.chat.active");

    var delay = randomNumber(800, 3000);
    recMessage("ok", delay);
  }
}

// create a function that receive a message in the chat with "text" after "time" in ms => recMessage("text", time)
function recMessage(text, time) {
  setTimeout(function() {
    var clock = new Date;
    var hours = clock.getHours();
    var minutes = clock.getMinutes();

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    var templateRec = $("ul.template .chat__li--rec").clone();
    var msg = text;
    clock = hours + ":" + minutes;


    templateRec.prepend(msg);
    templateRec.children("span").text(clock);
    templateRec.appendTo("ul.chat.active");

  }, time);
}

// script

$(document).ready(
  function () {

  // function sendMessage() when the user click button "send" or press "enter" key
  $("#send-message").click(sendMessage);

  $(".chat-input__input").keyup(function(e) {
    if (e.which == 13 && $(".chat-input__input").val() != "") {
      sendMessage();
    }
  });

  // showing the "send" button only when the input is != ""
  document.getElementById("chat-input__input").addEventListener("input",
    function () {
      if (document.getElementById("chat-input__input").value == "") {
        $(".chat-input__send").addClass("d_none");
        $(".chat-input__microphone").removeClass("d_none");
      } else {
        $(".chat-input__send").removeClass("d_none");
        $(".chat-input__microphone").addClass("d_none");
      }
  });

  // selecting the right chat (wip)
  $(".chat-prew__li").click(function () {
    $(".chat-prew__li").removeClass("active");
    $(this).addClass("active");
    var elementNumber = $(this).attr("data-chat");
  });

  // search in the chat list function
  document.getElementById("search_chat").addEventListener("input",
    function () {
      var inputValue = document.getElementById("search_chat").value;
      inputValue = inputValue.toLowerCase();

      if (inputValue != "") {
        $(".chat-prew__li").addClass("d_none_imp");
        $("[data-name*=" + inputValue + "]").removeClass("d_none_imp");

      } else if (inputValue == "") {
        $(".chat-prew__li").removeClass("d_none_imp");
      }
  });

});
