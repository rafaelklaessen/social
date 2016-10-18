import $ from 'jquery'
import {openModal, closeModal, notify} from './app'

// Open and close header dropdown
$('#header .container #actions .actions-item-container .profile-actions .profile-picture').click(function() {
  console.log('kaas')
  $(this).siblings('.profile-actions-dropdown').stop().toggle(200);
});
// Open Compose Tweet modal when Tweet button is clicked
$('#global-new-tweet-btn').click(function() {
  openModal('#new-tweet .modal');
});
// Close Compose Tweet modal when Tweet button is clicked
// TODO: Add AJAX request to file that puts the Tweet in the database
$('#new-tweet .modal .content-container .btn-container .right-container .tweet-btn').click(function() {
  if ($(this).attr('disabled') != 'disabled') {
    closeModal($(this).parents('.modal'));
    $(this).parents('.content-container').find('.compose-field').val('');
    setTimeout(function() {
      notify('Your Tweet was posted!');
    }, 400);
  }
});
// Calculate remaining chars for Tweet
$('#new-tweet .modal .content-container .compose-field').bind('keyup keydown click input propertychange', function() {
  setTweetRemainingChars(this);
});
// Calculates and sets the remaining characters. When the number of remaining characters 
// is smaller than 0, the Tweet button is disabled.
function setTweetRemainingChars(el) {
  let rightContainer = $(el).parents('.content-container').find('.right-container'), 
      inputLength = $(el).val().length,
      remainingChars = 140 - inputLength;
  if (remainingChars == 140 || remainingChars < 0) {
    rightContainer.find('.tweet-btn').attr('disabled', 'disabled');
  } else {
    rightContainer.find('.tweet-btn').removeAttr('disabled');
  }
  if (remainingChars <= 20) {
    rightContainer.find('.char-count').addClass('warn');
  } else {
    rightContainer.find('.char-count').removeClass('warn');
  }
  rightContainer.find('.char-count').text(remainingChars);
}
if ($('body').hasClass('user-page')) {
  $(window).scroll(function() {
    var scrollTop = $(this).scrollTop();
    console.log(scrollTop)
    $('#banner').css({
      'transform': 'translateY(' + scrollTop / 8 + '%)'
    });
  });
}
// Fix the size of the media items
function fixMediaItemSize() {
  $('.tweet .tweet-content-container .media-item').each(function() {
    $(this).height($(this).width() / 3 * 2);
  });
}
fixMediaItemSize();
$(window).resize(function() {
  fixMediaItemSize();
});
$(function() {
  var $window = $(window),
      wWidth = $window.width();
  setInterval(function() {
    if (wWidth != $window.width()) {
      wWidth = $window.width();
      fixMediaItemSize();
    }
  }, 300)
});