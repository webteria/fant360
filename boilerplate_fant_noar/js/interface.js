/*
 * G1 - Web App
 * -------------------
 * @autor: CGJ Arte G1
*/

"use strict";

//=====================
// INTERFACE
//=====================

/**
 * @namespace interface
 */
App.interface = {};
App.interface.windowJSOptions = {
  viewport: true,
  backgroundColor: 'rgba(0,0,0,0.9)'
};

//=====================
// METHODS
//=====================

App.interface.set = function() {
  (App.helpers.isMobile()) ? $('.whatsapp').show() : $('.whatsapp').remove();
  $('.window').windowJS(App.interface.windowJSOptions);
};

App.interface.events = function() {
  $(document).on('click', '.scroll-up', App.helpers.toTop);
  $(window).scroll(App.helpers.showButtonToTop);
};

App.interface.reset = function() {
}
