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
    let scrollTop = $(this).scrollTop();
    console.log(scrollTop)
    $('#banner').css({
      'transform': 'translateY(' + scrollTop / 8 + '%)'
    });
  });
}
// Fix the size of the media items
function fixMediaItemSize() {
  $('.tweet .tweet-content-container .media-item, .notification .notification-tweet .tweet-content .media-item').each(function() {
    $(this).height($(this).width() / 3 * 2);
  });
}
fixMediaItemSize();
$(window).resize(function() {
  fixMediaItemSize();
});
$(function() {
  let $window = $(window),
      wWidth = $window.width();
  setInterval(function() {
    if (wWidth != $window.width()) {
      wWidth = $window.width();
      fixMediaItemSize();
    }
  }, 300)
});
// Open URL of Tweet when it's clicked
$('.tweet .tweet-actions .tweet-action-container .view-tweet-btn').click(function() {
  let tweet = $(this).parents('.tweet'),
      tweetAuthor = tweet.data('author'), 
      tweetId = tweet.attr('id').replace('tweet-', ''),
      url = `/users/${tweetAuthor}/status/${tweetId}`;
  window.location.assign(url);
});
// Open media item when it's clicked
$('.tweet .tweet-content-container .media-item').click(function() {
  let img = $(this).css('background-image').replace('url("', '').replace('")', '');
  $(`
    <section class="media-item-modal-overlay overlay">
      <section class="media-item-modal modal">
        <header class="title-container">
          <h1 class="title">Media</h1>
          <div class="close-btn btn">
            <img src="${closeBtnIconUrl}" alt="Close icon">
          </div>
        </header>
        <section class="content-container">
          <img class="media-item-fullmodal" src="${img}" alt="Media item">
        </section>
      </section>
    </section>
    `).appendTo('body').find('.close-btn').click(function() {
      let modal = $(this).parents('.media-item-modal');
      closeModal(modal);
      setTimeout(function() {
        $('body .overlay:last-child').remove();
      }, 404);
    });
  openModal($('body :last-child').find('.media-item-modal'));
});
// Open more Tweet actions dropdown
$('.tweet .tweet-actions .more-btn .icon').click(function() {
  $(this).siblings('.more-dropdown').stop().toggle(200);
});