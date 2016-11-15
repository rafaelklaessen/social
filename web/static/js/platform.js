import $ from 'jquery';
import {openModal, closeModal, notify} from './app';

// Open and close header dropdown
$('#header .container #actions .actions-item-container .profile-actions .profile-picture').click(function() {
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
// Parallax on user banner
if ($('body').hasClass('user-page')) {
  $(window).scroll(function() {
    let scrollTop = $(this).scrollTop();
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
  }, 300);
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
$('.tweet .tweet-content-container .media-item, #main #messages .messages-widget .message-container .media-message .media-item').click(function() {
  let img = $(this).attr('src') || $(this).css('background-image').replace('url("', '').replace('")', '');
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
// Shortcut for message container
let messageContainer = $('#main #messages .messages-widget .message-container');
// Fix message margin-right to compensate scrollBar
function getBrowserScrollSize() {
  var css = {
      "border":  "none",
      "height":  "200px",
      "margin":  "0",
      "padding": "0",
      "width":   "200px"
  };
  var inner = $("<div>").css($.extend({}, css));
  var outer = $("<div>").css($.extend({
      "left":       "-1000px",
      "overflow":   "scroll",
      "position":   "absolute",
      "top":        "-1000px"
  }, css)).append(inner).appendTo("body")
  .scrollLeft(1000)
  .scrollTop(1000);
  var scrollSize = {
      "height": (outer.offset().top - inner.offset().top) || 0,
      "width": (outer.offset().left - inner.offset().left) || 0
  };
  outer.remove();
  return scrollSize;
}
// Set margin-right
messageContainer.find('.your-message').css({'margin-right': -1 * getBrowserScrollSize().width + 'px'});
// Automatically scroll down in message container so that you start at the latest message
messageContainer.scrollTop(messageContainer.prop('scrollHeight'));
// Open new message screen when new message button is clicked
$('#new-message-btn').click(function() {
  $(this).parents('#messages-widget').find('#new-message').css({'left': '0'});
});
// Close new message screen when back button is clicked
$('#new-message-back-btn').click(function() {
  $(this).parents('#messages-widget').find('#new-message').css({'left': 'calc(100% + 30px)'});
});
$('#main #messages #new-message .content-container .user-autofill .user-container .user').click(function() {
  console.log($(this).data('user'));
});
$('#user-page.user-page-editable #tweet-nav-widget-edit-btn').click(() => {
  setEditMode();
});
/**
 * setEditMode() function
 * Sets user page in edit mode.
 */
function setEditMode() {
  // Add edit class to main
  $('#main').addClass('edit');
  // Change edit button to save button and unbind click listener
  $('#user-page.user-page-editable #tweet-nav-widget-edit-btn')
    .removeClass('blue-btn')
    .addClass('grey-btn')
    .removeClass('tweet-nav-widget-edit-btn')
    .addClass('tweet-nav-widget-save-btn')
    .attr('id', 'tweet-nav-widget-save-btn')
    .text('Save')
    .unbind();

  $('#user-page.user-page-editable #tweet-nav-widget-save-btn').click(() => {
    saveEdits();
  });

  // Shortcuts
  let userPage = $('#user-page.user-page-editable');
  let profileDataTop = userPage.find('#profile-data-top');
  let profileDataWidgetContent = userPage.find('#profile-data-widget .content-container');1

  let fields = [
      'profile-data-bio', 
      'profile-data-location', 
      'profile-data-website', 
      'profile-data-birthday'
    ];
  let fieldsMaxLength = [160, 30, 100];

  for (let i = fields.length - 1; i >= 0; i--) {
    if (!$(`.${fields[i]}`).length) {
      let insertBefore = fields[i + 1] || 'profile-data-theme-color';
      $(`
        <div id="${fields[i]}" class="${fields[i]} ${fields[i] !== 'profile-data-bio' ? 'profile-data-item' : ''}" ${fields[i] !== 'profile-data-birthday' ? `maxlength="${fieldsMaxLength[i]}"` : ''}>
          ${fields[i] !== 'profile-data-bio' ? 
            `<span class="icon">
              <img src="/images/icons/home-icon.png" alt="Location icon">
            </span>` : ''}
          <span class="data"></span>
        </div>
      `).insertBefore(profileDataWidgetContent.find(`.${insertBefore}`));
    }
  }

  addImgUploadModal('banner');
  addImgUploadModal('profile-picture');
  let nameField = profileDataTop.find('#name');
  nameField.find('.profile-link').hide();
  if (!nameField.find('.edit-input').length) {
    nameField.append(`<input class="edit-input" type="text" maxlength="20" value="${nameField.find('.profile-link').text()}">`);
  }
  profileDataWidgetContent.find('.profile-data-bio').each(function() {
    let data = $(this).find('.data');
    data.hide();
    $(this).append(`<textarea class="profile-data-textarea" maxlength="160" placeholder="Bio">${data.text().replace(/ +(?= )/g,'')}</textarea>`);
  });
  profileDataWidgetContent.find('.profile-data-item:not(.profile-data-joined, .profile-data-birthday)').each(function() {
    let data = $(this).find('.data');
    data.hide();
    let placeholder = $(this).attr('id').replace('profile-data-', '');
    placeholder = placeholder.charAt(0).toUpperCase() + placeholder.slice(1);
    let maxlength = $(this).data('maxlength');
    let maxLengthAttr;
    if (typeof maxlength != 'undefined') {
      maxLengthAttr = `maxlength="${maxlength}"`;
    } else {
      maxLengthAttr = '';
    }
    if (!$(this).is('.profile-data-theme-color')) {
      $(this).append(`<input class="profile-data-input" type="text" ${maxLengthAttr} value="${data.text().replace(/ +(?= )/g,'').trim()}" placeholder="${placeholder}">`);
    }
  });
  profileDataWidgetContent.find('.profile-data-theme-color').show().find('.color-bar').click(function() {
    $(this).siblings('.color-picker').stop().slideToggle(400);
  });
  profileDataWidgetContent.find('.profile-data-theme-color').find('.color-picker .color-picker-item').click(function() {
    let newColor = $(this).data('color');
    $(this).parents('.profile-data-theme-color').find('.color-bar').data('color', newColor).css({'background-color': newColor});
  });
  profileDataWidgetContent.find('.profile-data-theme-color').find('.color-picker .custom-color .hex-color-input').bind('keyup keydown click input propertychange', function() {
    let newColor = `#${$(this).val()}`;
    $(this).parents('.profile-data-theme-color').find('.color-bar').data('color', newColor).css({'background-color': newColor});
  });
  profileDataWidgetContent.find('.profile-data-joined').each(function() {
    let joinedHTML = $(this).html();
    $(this).remove();
    $(`
      <div id="profile-data-joined" class="profile-data-joined profile-data-item">
        ${joinedHTML}
      </div>
    `).appendTo(profileDataWidgetContent).hide();
  });
  let profileDataBirthday = profileDataWidgetContent.find('.profile-data-birthday');
  if (profileDataBirthday.length) {
    let data = profileDataBirthday.find('.data');
    let currentBirthday = data.text();
    data.hide();
    addBirthdaySelect(currentBirthday, profileDataBirthday);
  } else {
    let profileDataBirthdayNewEl = $(`
      <div id="profile-data-birthday" class="profile-data-birthday profile-data-item">
        <span class="icon">
          <img src="/images/icons/home-icon.png" alt="Birthday icon">
        </span>
        <span class="data">Not set</span>
      </div>
    `).appendTo(profileDataWidgetContent);
    let data = profileDataBirthdayNewEl.find('.data');
    data.hide();
    let currentBirthday = data.text();
    addBirthdaySelect(currentBirthday, profileDataBirthdayNewEl);
  }
  /**
   * addBirthdaySelect() function
   * Adds a birthday select
   * @param {string} currentBirthday Current birthday
   * @param {string} appendTo Element to append select to
   */
  function addBirthdaySelect(currentBirthday, appendTo) {
    let birthday = currentBirthday.replace('Born on', '').split('-');
    let currentBirthdayMonth;
    let currentBirthdayDay;
    let currentBirthdayYear;
    if (Array.isArray(birthday) && birthday.length === 3) {
      currentBirthdayMonth = parseInt(birthday[0]);
      currentBirthdayDay = parseInt(birthday[1]);
      currentBirthdayYear = parseInt(birthday[2]);
      birthday = [currentBirthdayMonth, currentBirthdayDay, currentBirthdayYear];
    }
    $(appendTo).append(`
      <div id="birthday-select" class="birthday-select date-select select">
        <select class="birthday-month-select month-select"></select>
        <select class="birthday-day-select day-select"></select>
        <select class="birthday-year-select year-select"></select>
      </div>
    `);
    let defaultSelected;
    // Set default selected to existing data if it exists, if not, set it to 'Month, Day Year'
    if (typeof birthday[0] !== 'undefined' && typeof birthday[1] !== 'undefined' && typeof birthday[2] !== 'undefined' && typeof birthday !== 'string') {
      defaultSelected = birthday;
    } else {
      defaultSelected = ['Month' , 'Day', 'Year'];
    }
    // Lengths of months
    let monthLengthData = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let daysInMonth;
    // Set days in month to selected month if it exists, if not, use the 31 default
    if (typeof defaultSelected[0] === 'number') {
      daysInMonth = monthLengthData[currentBirthdayMonth - 1];
    } else {
      daysInMonth = 31;
    }
    // Shortcut
    let birthdayDaySelect = profileDataWidgetContent.find('#birthday-select .birthday-day-select');
    // Loop through all days and add them to the day select
    for (let i = 1; i <= daysInMonth; i++) {
      // If it's the default day, set it as selected, if it's not, just add it
      if (i == defaultSelected[1]) {
        birthdayDaySelect.append(`<option value="${i}" selected="selected">${i}</option>`);
      } else {
        birthdayDaySelect.append(`<option value="${i}">${i}</option>`);
      }
    }
    // Check if default day is a string. If it is, add a day option that's selected. If it's not, just add it.
    if (typeof defaultSelected[0] === 'string') {
      birthdayDaySelect.prepend('<option value="day" selected="selected">Day</option>');
    } else {
      birthdayDaySelect.prepend('<option value="day">Day</option>');
    }
    // Shortcut
    let birthdayMonthSelect = profileDataWidgetContent.find('#birthday-select .birthday-month-select');
    // Loop through all months and add them to the day select
    for (let i = 1; i < 13; i++) {
      // If it's the default month, set it as selected, if it's not, just add it
      if (i === defaultSelected[0]) {
        birthdayMonthSelect.append(`<option value="${i}" selected="selected">${i}</option>`);
      } else {
        birthdayMonthSelect.append(`<option value="${i}">${i}</option>`);
      }
    }
    // Check if default month is a string. If it is, add a month option that's selected. If it's not, just add it.
    if (typeof defaultSelected[0] === 'string') {
      birthdayMonthSelect.prepend('<option value="month" selected="selected">Month</option>');
    } else {
      birthdayMonthSelect.prepend('<option value="month">Month</option>');
    }
    // Shortcut
    let birthdayYearSelect = profileDataWidgetContent.find('#birthday-select .birthday-year-select');
    // Current year
    let date = new Date();
    let currentYear = date.getFullYear();
    // Maximum age possible for user
    let maxAge = 122;
    // Minimum age possible for user
    let minAge = 13;
    // Loop through all years and add them to the day select
    for (let i = currentYear - minAge; i >= currentYear - maxAge; i--) {
      // If it's the default year, set it as selected, if it's not, just add it
      if (i === defaultSelected[2]) {
        birthdayYearSelect.append(`<option value="${i}" selected="selected">${i}</option>`);
      } else {
        birthdayYearSelect.append(`<option value="${i}">${i}</option>`);
      }
    }
    // Check if default year is a string. If it is, add a year option that's selected. If it's not, just add it.
    if (typeof defaultSelected[2] === 'string') {
      birthdayYearSelect.prepend('<option value="year" selected="selected">Year</option>');
    } else {
      birthdayYearSelect.prepend('<option value="year">Year</option>');
    }
    // If month input changes, change days in month as well
    birthdayMonthSelect.change(() => {
      let selectedMonth = Number(birthdayMonthSelect.val());
      let currentBirthdayDay = Number(birthdayDaySelect.val());
      let currentMonthLength = monthLengthData[selectedMonth - 1];
      // Remove all days
      birthdayDaySelect.children().remove();
      // Loop through all days and add them to the day select
      for (let i = 1; i <= currentMonthLength; i++) {
        birthdayDaySelect.append(`<option value="${i}">${i}</option>`);
      }
      if (currentBirthdayDay >= currentMonthLength) {
        birthdayDaySelect.val(currentMonthLength);
      } else {
        birthdayDaySelect.val(currentBirthdayDay);
      }
    });
  };
  /**
   * addImgUploadModal() function
   * Adds an img upload modal when given element is clicked.
   * @param {string} name Name of the modal. This is also the element that's being listened for click.
   */
  function addImgUploadModal(name) {
    $(`#${name}`).addClass('edit');
    let currentImg = $(`#${name}`).css('background-image').replace('url("', '').replace('")', '');
    $(`
      <section id="${name}-edit-modal-overlay" class="${name}-edit-modal-overlay image-upload-modal-overlay overlay">
        <section id="${name}-edit-modal" class="${name}-edit-modal image-upload-modal modal">
          <header class="title-container">
            <h1 class="title">Upload a ${name.replace('-', ' ')}</h1>
            <div class="close-btn btn">
              <img src="${closeBtnIconUrl}" alt="Close icon">
            </div>
          </header>
          <section class="content-container">
            <img id="${name}-preview" class="${name}-preview upload-image-preview" src="${currentImg}" alt="Your uploaded ${name.replace('-', ' ')}">
            <div class="upload-input-container">
              <input id="${name}-upload-input" class="${name}-upload-input upload-input" name="${name}-upload-input" type="file" accept=".jpg, .png">
              <label for="${name}-upload-input" class="grey-btn btn">Upload a ${name.replace('-', ' ')}</label>
            </div>
            <section class="select-${name}-btn-container select-upload-image-btn-container">
              <div id="select-${name}-btn" class="select-${name}-btn select-upload-image-btn blue-btn btn">Select</div>
            </section>
          </section>
        </section>
      </section>
    `).appendTo('body');
    $(`#${name}-edit-modal .close-btn`).click(function() {
      let modal = $(this).parents(`#${name}-edit-modal`);
      closeModal(modal);
    });
    $(`#${name}-edit-modal #${name}-upload-input`).change(function() {
      setPreview(this, `#${name}-edit-modal #${name}-preview`);
    });
    $(`#${name}-edit-modal #select-${name}-btn`).click(function() {
      let newImgSrc = $(this).parents('.content-container').find('img').attr('src');
      let modal = $(this).parents(`#${name}-edit-modal`);
      closeModal(modal);
      if (newImgSrc) {
        $(`#${name}`).css({'background-image': `url('${newImgSrc}')`});
      }   
    });
    $(`#${name}`).click(function() {
      openModal(`#${name}-edit-modal`);
    });
  }
  /**
   * setPreview() function
   * Sets the profile-picture preview in the profile-picture edit modal.
   * @param {string} input Input to get preview image from.
   * @param {string} img Image to put preview in.
   */
  function setPreview(input, img) {
    console.log(input, img, input.files, input.files[0]);
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function(e) {
        $(img).show().attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}
/**
 * saveEdits() function
 * Saves edits on user page
 */
function saveEdits() {
  // Remove edit class from main
  $('#main').removeClass('edit');
  // Change save button to edit button and unbind click listener
  $('#user-page.user-page-editable #tweet-nav-widget-save-btn')
    .removeClass('grey-btn')
    .addClass('blue-btn')
    .removeClass('tweet-nav-widget-save-btn')
    .addClass('tweet-nav-widget-edit-btn')
    .attr('id', 'tweet-nav-widget-edit-btn')
    .text('Edit profile')
    .unbind();

  $('#user-page.user-page-editable #tweet-nav-widget-edit-btn').click(() => {
    setEditMode();
  });

  // Shortcuts
  let userPage = $('#user-page.user-page-editable');
  let profileDataTop = userPage.find('#profile-data-top');
  let profileDataWidgetContent = userPage.find('#profile-data-widget .content-container');

  let nameField = profileDataTop.find('#name');
  nameField.find('.profile-link').show();
  nameField.each(function() {
    let inputVal = $(this).find('.edit-input').val();
    let newName = inputVal.trim() || $(this).find('.profile-link').text();
    $(this).find('.edit-input').remove();
    $(this).find('.profile-link').text(newName).show();
    userPage.find('#profile-data-widget #profile-data-name').text(newName);
  });
  
  // Remove image upload modals and unbind listeners
  $('#banner, #profile-picture').off('click');
  $('#banner-edit-modal-overlay, #profile-picture-edit-modal-overlay').remove();

  profileDataWidgetContent.find('.profile-data-joined').show();

  profileDataWidgetContent.find('.profile-data-item:not(.profile-data-joined, .profile-data-birthday), .profile-data-bio').each(function() {
    let input = $(this).find('.profile-data-input').length ? $(this).find('.profile-data-input') : $(this).find('.profile-data-textarea');
    let inputVal = input.val();
    if ($(this).is('.profile-data-website') && inputVal.trim() !== '') {
      if (inputVal.indexOf('http://') === -1 || inputVal.indexOf('https://') === -1) {
        inputVal = 'http://' + inputVal;
      }
      inputVal = `
        <a href="${inputVal}" target="_blank">
          ${inputVal.replace('https://', '').replace('http://', '').replace('www.', '').replace(/[&<>"'\/]/g, '')}
        </a>
      `;
    }
    if ($(this).is('.profile-data-theme-color')) {
      $(this).hide().find('.color-picker').hide();
      $(this).find('.color-bar').off('click');
      // Get theme color and remove #
      let themeColor = $(this).find('.color-bar').data('color').replace('#', '');
      $(this).find('.color-picker .custom-color .hex-color-input').attr('placeholder', themeColor);
      // Fix length if required
      themeColor = themeColor.length === 3 ? themeColor + themeColor : themeColor;
      // Convert to RGB
      themeColor = hexToRgb(themeColor);
      if (themeColor !== null) {
        themeColor = `rgb(${themeColor.r}, ${themeColor.g}, ${themeColor.b})`;
        $('#nav a, #profile-data-website a, .tweet .tweet-content-container a')
          .css({'color': themeColor})
          .hover(function() {
            $(this).css({'color': darkenColor(themeColor)});
          }, function() {
            $(this).css({'color': themeColor});
          });
        $('#nav .bottom-line, #global-new-tweet-btn, #new-tweet .tweet-btn, #follow-btn, #tweet-nav-widget-edit-btn, #tweet-nav-widget-save-btn')
          .css({'background-color': themeColor})
          .hover(function() {
            if (!$(this).attr('disabled')) {
              $(this).css({'background-color': darkenColor(themeColor)});
            }
          }, function() {
            $(this).css({'background-color': themeColor});
          });
      }
      /**
       * hexToRgb
       * Converts given hex code to rgb.
       * @param {string} hex Hex codee to convert. 
       * @return {strign} RGB code.
       */
      function hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }
      /**
       * darkenColor() function
       * Helper method. Darkens given color.
       * @param {string} color Color to darken.
       * @return {string} Darkened color.
       */
      function darkenColor(color) {   
        let colorRGB = color.replace('rgb(', '').replace(')', '').split(',');
        let R = Math.round(colorRGB[0] * (1 - 0.2));
        let G = Math.round(colorRGB[1] * (1 - 0.2));
        let B = Math.round(colorRGB[2] * (1 - 0.2));
        return `rgb(${R}, ${G}, ${B})`;
      }
    }
    input.remove();
    if (!$(this).is('.profile-data-theme-color')) {
      let data = $(this).find('.data');
      if (inputVal.trim()) {
        $(this).is('.profile-data-website') ? data.html(inputVal) : data.text(inputVal);
        data.show();
      } else {
        $(this).remove();
      }
    }
  });

  profileDataWidgetContent.find('.profile-data-birthday').each(function() {
    let input = $(this).find('.birthday-select');
    let birthdayMonthSelectVal = input.find('.birthday-month-select').val().toString().toLowerCase();
    let birthdayDaySelectVal = input.find('.birthday-day-select').val().toString().toLowerCase();
    let birthdayYearSelectVal = input.find('.birthday-year-select').val().toString().toLowerCase();
    // Remove birthday if no valid data was given. If valid data was given, show it.
    if (birthdayMonthSelectVal === 'month' || birthdayDaySelectVal === 'day' || birthdayYearSelectVal === 'year') {
      $(this).remove();
    } else {
      birthdayMonthSelectVal = birthdayMonthSelectVal.toString().length === 1 ? '0' + birthdayMonthSelectVal : birthdayMonthSelectVal;
      birthdayDaySelectVal = birthdayDaySelectVal.toString().length === 1 ? '0' + birthdayDaySelectVal : birthdayDaySelectVal;
      let birthday = `Born on ${birthdayMonthSelectVal}-${birthdayDaySelectVal}-${birthdayYearSelectVal}`;
      input.remove();
      let data = $(this).find('.data');
      data.text(birthday);
      data.show();
    }
  });
}