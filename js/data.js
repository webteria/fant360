/*
 * G1 - Web App
 * -------------------
 * @autor: CGJ Arte G1
*/

"use strict";

//=====================
// DATA
//=====================

App.data = {};
App.data.info = null;

//=====================
// METHODS
//=====================

App.data.load = function(file) {
	$.getJSON(file, App.data.loaded);
};

App.data.loaded = function(data) {
	App.data.info = data;
	App.data.parse();
};

App.data.parse = function() {
	App.ready();
};