// functions
function sendMessage() {
  if ($(".chat-input__input").val() != "") {
    
    var templateSend = $("ul.template .chat__li--send").clone();
    var msg = $(".chat-input__input").val();

    $(".chat-input__input").val("");

    templateSend.prepend(msg);
    // msg.prependTo(templateSend);
    templateSend.appendTo("ul.chat");
  }

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
