// functions

// function that scroll the chat all the way to the bottom
// accept (time)

function scrollToBottom(time) {
  var heightChat = $(".chat.active").height();
  $(".app__right__chat").animate({scrollTop: heightChat}, time);
}

// function that return the time in 13:01 format
function getTime() {
  var clock = new Date;
  var hours = clock.getHours();
  var minutes = clock.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return hours + ":" + minutes;
}

// create a function that generate a random number => randomNumber(min, max)
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// create a function that send a message in the chat with the value of the input => sendMessage()
function sendMessage() {
  if ($(".chat-input__input").val() != "") {
    var templateSend = $("ul.template .chat__li--send").clone();
    var msg = $(".chat-input__input").val();
    clock = getTime();

    $(".chat-input__input").val("");
    $(".chat-input__send").addClass("d_none");
    $(".chat-input__microphone").removeClass("d_none");

    templateSend.prepend(msg);
    templateSend.children("span.time").text(clock);
    templateSend.appendTo("ul.chat.active");

    var index = $("ul.chat.active").attr("data-chat");

    $(".chat-prew__li[data-prew=" + index + "] .chat-prew__li__name h6").text(msg);
    $(".header-right__name[data-chat=" + index + "] h6").text("sta scrivendo...");

    scrollToBottom(900);

    var delay = randomNumber(800, 3000);
    recMessage("ok", delay, index);
  }
}

// create a function that receive a message in the chat with "text" after "time" in ms => recMessage("text", time)
function recMessage(text, time, index) {
  setTimeout(function() {
    var templateRec = $("ul.template .chat__li--rec").clone();
    var msg = text;
    clock = getTime();


    templateRec.prepend(msg);
    templateRec.children("span.time").text(clock);
    templateRec.appendTo("ul.chat[data-chat=" + index + "]");

    $(".header-right__name[data-chat=" + index + "] h6").text("Ultimo accesso oggi alle " + clock);
    $(".chat-prew__li[data-prew=" + index + "] .chat-prew__li__name h6").text(text);
    $(".chat-prew__li[data-prew=" + index + "] .chat-prew__li__time span").text(clock);

    scrollToBottom(900);

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

  // selecting the right chat
  $(".chat-prew__li").click(function () {
    $(".chat-prew__li").removeClass("active");
    $(this).addClass("active");
    var elementNumber = $(this).attr("data-prew");

    $("[data-chat].active").removeClass("active");
    $("[data-chat=" + elementNumber + "]").addClass("active");

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

  // delete message with .delete <a>
  $(".chat").on("click", ".delete",
    function () {
      var index = $(this).parents("ul.chat.active").attr("data-chat");

      $(this).parents(".chat__li").remove();

      var lastMessage = $("ul.chat[data-chat=" + index + "] .chat__li:last-child").text();

  });

  // open/close dropdown-menu
  $(".chat").on("click", ".angle",
    function () {
      var notVisible = $(this).find(".dropdown-menu").hasClass("d_none");

      $(".dropdown-menu").addClass("d_none");
      $(".chat__li").removeClass("z-index");

      if (notVisible) {
        $(this).find(".dropdown-menu").removeClass("d_none");
        $(this).parents(".chat__li").addClass("z-index");
      } else {
        $(this).find(".dropdown-menu").addClass("d_none");
        $(this).parents(".chat__li").removeClass("z-index");
      }
  });

  // .to-bottom => click
  $(".to-bottom").click(function () {
    scrollToBottom();
  });

  // event scroll => if scroll is not all the way down, the button .to-bottom appear
  $(".app__right__chat").scroll(function () {

    var heightChatActive = $(".chat.active").height();
    heightChatActive += 80;

    var heightChatRight = $(".app__right__chat").height();

    var maxScroll = heightChatActive - heightChatRight;

    var scrollState = $(".app__right__chat").scrollTop();

    if (scrollState < (maxScroll - 25)) {
      $(".to-bottom").removeClass("d_none");
    } else {
      $(".to-bottom").addClass("d_none");
    }
  });



});
