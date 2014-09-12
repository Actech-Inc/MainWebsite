$(function() {
  var email_form = '' +
    '<div class="EmailForm hide">' +
    '<div class="handle">Ask us anything!</div>' +
    '<div class="form">' +
    '<input class="name" placeholder="Name (what should we call you?)" /><br>' +
    '<input class="email" placeholder="Email (how do we reach you?)" /><br>' +
    '<textarea class="message" placeholder="Got any question? We have an answer for you."></textarea><br>' +
    '<div class="email_form_submit">Send</div>' +
    '</div></div>';

  $('body').append(email_form);

});

$('.EmailForm .email_form_submit').live('click', function() {
  alert('validating...');
  return false;
});

$('.EmailForm .handle').live('click', function() {
  $('.EmailForm').toggleClass('hide');
});

