import "phoenix_html"
import $ from "jquery"

/**
 * TODO: Implement OOP when stuff is done 
 */


// Close modals
$('.modal .title-container .close-btn').click(function() {
  var modal = $(this).parents('.modal');
  closeModal(modal);
});
/**
 * Open modal function
 * Opens given modal
 * @param {string/element} modal to open
 */
function openModal(modal) {
  $(modal).parents('.overlay').fadeIn(400);
  $(modal).addClass('open');
}
/**
 * Close modal function
 * Closes given modal
 * @param {string/element} modal to close
 */
function closeModal(modal) {
  $(modal).parents('.overlay').fadeOut(400)
  $(modal).removeClass('open');
}
/**
 * Notify function
 * Shows given notification content in a notification
 * @param {string} notification content
 */
function notify(notification) {
  alert(notification);
}
// Open and close header dropdown
$('#header .container #actions .actions-item-container .profile-actions .profile-pic').click(function() {
  $(this).siblings('.profile-actions-dropdown').stop().toggle(200);
});
// Open Compose Tweet modal when Tweet button is clicked
$('#global-new-tweet-btn').click(function() {
  openModal('#new-tweet .modal');
});
// Close Compose Tweet modal when Tweet button is clicked
// TODO: Add AJAX request to file that puts the Tweet in the database
$('#new-tweet .modal .content-container .btn-container .right-container .tweet-btn').click(function() {
  closeModal($(this).parents('.modal'));
  setTimeout(function() {
    notify('Your Tweet was posted!');
  }, 400);
});
// Calculate remaining chars for Tweet
$('#new-tweet .modal .content-container .compose-field').bind('keyup keydown click input propertychange', function() {
  setTweetRemainingChars(this);
});
// Calculates and sets the remaining characters. When the number of remaining characters 
// is smaller than 0, the Tweet button is disabled.
function setTweetRemainingChars(el) {
  var rightContainer = $(el).parents('.content-container').find('.right-container'), 
      inputLength = $(el).val().length,
      remainingChars = 140 - inputLength;
  if (remainingChars < 0) {
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