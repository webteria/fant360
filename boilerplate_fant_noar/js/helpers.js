/*
 * G1 - Web App
 * -------------------
 * @autor: CGJ Arte G1
*/

"use strict";

//=====================
// HELPERS
//=====================

App.helpers = {};

//=====================
// METHODS
//=====================

App.helpers.isMobile = function() {
	return (Modernizr.touch && ($(window).width() <= 1024));
};

App.helpers.stringToSlug = function(string) {
	string = string.replace(/^\s+|\s+$/g, '');
	string = string.toLowerCase();

	var from = "ãàáäâèéëêìíïîõòóöôùúüûñç·/_,:;";
	var to   = "aaaaaeeeeiiiiooooouuuunc------";
	for (var i=0, l=from.length ; i<l ; i++) {
		string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	string = string.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

	return string;
};

App.helpers.propertyGetIndex = function(data, property, value) {
	for(var i = 0; i < data.length; i++) {
		var string = App.helpers.stringToSlug(data[i][property]);

		if (string == value) {
			return i;
		}
	}
};

App.helpers.indexOf = function() {
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(obj, start) {
			for(var i = (start || 0), j = this.length; i < j; i++) {
				if (this[i] === obj) {
					return i;
				}
			}
			return -1;
		}
	}
};

App.helpers.toTop = function() {
  $('html, body').animate({ scrollTop: $('#barra-globocom').height() + $('.g1-header').height() + $('#header').height() }, 600);
  return false;
};

App.helpers.showButtonToTop = function() {
  ($(this).scrollTop() > 700) ? $('.scroll-up').fadeIn() : $('.scroll-up').fadeOut()
};

