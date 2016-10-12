import $ from 'jquery'
import {openModal, closeModal, notify} from './app'

$('#login-btn').click(function() {
  openModal('#login .modal');
});