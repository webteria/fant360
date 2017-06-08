/*
 * G1 - Web App
 * -------------------
 * @autor: CGJ Arte G1
*/

"use strict";

console.time('Page load');

//=====================
// REGISTER
//=====================

var App = App || {};

//=====================
// APP
//=====================

App.init = function() {
	var file = 'js/data.json';
	App.data.load(file);
};

App.ready = function() {
	App.interface.set();
	App.interface.events();
};

//=====================
// ASSIGN
//=====================

window['App'] = App;


//=====================
// READY
//=====================

$(document).ready(App.init);