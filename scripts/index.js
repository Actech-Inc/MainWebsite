$(function() {
  var email_form = '' +
    '<div class="EmailForm hide">' +
    '<div class="handle">Ask us anything!</div>' +
    '<div class="form">' +
    '<input class="name" placeholder="Name (How should we call you?)" /><br>' +
    '<input class="email" placeholder="Email (How do we reach you?)" /><br>' +
    '<textarea class="message" placeholder="Any question? We have an answer for you! "></textarea><br>' +
    '<div class="error_message"></div>' +
    '<div class="email_form_submit">Send</div>' +
    '</div></div>';

  $('body').append(email_form);

});

$('.EmailForm .handle').live('click', function() {
  toggleForm();
});

$('.EmailForm .email_form_submit').live('click', function() {
  var $EmailForm = $('.EmailForm');
  var name = $EmailForm.find('.name').val();
  if(isEmpty(name)) {
    return err('Your name please?');
  }
  var email = $EmailForm.find('.email').val();
  if(isEmpty(email)) {
    return err('Your email please?');
  }
  if(!validateEmail(email)) {
    return err('Invalid email');
  }
  var message = $EmailForm.find('.message').val();
  if(isEmpty(message)) {
    return err('What do you want to tell us?')
  }

  clear_err_msg();

  $.get('https://mandrillapp.com/api/1.0/messages/send.json', {
    key: 'GiGL0eZcpKWIG7NUKqb2Cw', // production
    message: {
      subject: '[INQUIRY] From website - ' + name,
      text: message,
      from_email: email,
      from_name: name,
      to: [{
        email: 'info@actech-inc.com',
        name: 'actech-inc',
        type: 'to'
      }],
      important: true
    }
  });

  clear_form();
  toggleForm();
  alert('We\'ve got your message, we will contact you as soon as possible.');
});

function clear_err_msg() {
  err('');
}

function clear_form() {
  var $EmailForm = $('.EmailForm');
  $EmailForm.find('.name').val('');
  $EmailForm.find('.email').val('');
  $EmailForm.find('.message').val('');
}

function err(msg) {
  $('.EmailForm .error_message').text(msg);
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function isEmpty(s) {
  return trim(s) === '';
}

function trim(s) {
  return s.replace(/^\s*|\s*$/g, '');
}

function toggleForm() {
  $('.EmailForm').toggleClass('hide');
}
