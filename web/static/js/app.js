import 'phoenix_html'
import $ from 'jquery'

/**
 * TODO: Implement OOP when stuff is done 
 */
// Close modals
$('.modal .title-container .close-btn').click(function() {
  let modal = $(this).parents('.modal');
  closeModal(modal);
});
/**
 * Open modal function
 * Opens given modal
 * @param {string/element} modal to open
 */
export function openModal(modal) {
  $(modal).parents('.overlay').fadeIn(400);
  $(modal).addClass('open');
}
/**
 * Close modal function
 * Closes given modal
 * @param {string/element} modal to close
 */
export function closeModal(modal) {
  $(modal).parents('.overlay').fadeOut(400)
  $(modal).removeClass('open');
}
/**
 * Notify function
 * Shows given notification content in a notification
 * @param {string} notification content
 */
export function notify(notification) {
  alert(notification);
}