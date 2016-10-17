import $ from 'jquery'
import {openModal, closeModal, notify} from './app'

// Open login modal
$('#login-btn').click(function() {
  openModal('#login .modal');
});
// Slider JavaScript
function slide() {
  var slider = $('.slider'),
      currentSlide = (slider.css('left').replace('px' , '') / -$(window).width()) + 1,
      nextSlide = currentSlide + 1,
      lastSlide = slider.find(':last-child').attr('id').replace('slide-', '');
  if (currentSlide < lastSlide) {
    slider.css({'left': currentSlide * -100 + 'vw'});
  } else {
    slider.css({'left': '0'});
  }
}
setInterval(function() {
  slide();
}, 10000)