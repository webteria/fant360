(function($){

    /*
     * G1 - Web Application
     * --------------------
     * @autor: CGJ Arte G1
     *
     *     __________          ________
     *    /\   ______\        /\____   \
     *    \ \  \ ___ /        \/____/\  \
     *     \ \  \    _______        \ \  \
     *      \ \  \  /\ ___  \        \ \  \
     *       \ \  \ \/___/\  \        \ \  \
     *        \ \  \_____\_\  \       _\_\  \___
     *         \ \_____________\     /\__________\
     *          \/_____________/     \/__________/
     *
     * <> with ❤
    */

    'use strict';

    //=====================
    // VARS
    //=====================

    var json = 'js/data.json', entries;
    var windowJSOptions =  {
      viewport: true,
      backgroundColor: 'rgba(0,0,0,0.9)'
    };

    //=====================
    // READY
    //=====================

    $(document).ready(appInit);

    //=====================
    // APP
    //=====================

    function appInit() {
      appSet();
      appEvents();
      appLoad();
    }

    function appSet() {
      (mobile()) ? $('.whatsapp').show() : $('.whatsapp').remove();
      $('.windowjs').windowJS(windowJSOptions);
    }

    function appEvents() {
      $(document).on('click', '.scroll-up', scrollToUp);
      $(window).scroll(showBtnScrollUp);
    }

    function appLoad() {
      $.getJSON(json, appLoaded);
    }

    function appLoaded(response) {
      entries = response;,
    }

    //=====================
    // HELPERS
    //=====================

    function mobile() {
      return (Modernizr.touch && ($(window).width() <= 1024));
    }

    function scrollOnLoad() {
      $('html, body').animate({ scrollTop: $('#barra-globocom').height() + $('.g1-header').height() }, 600);
      return false;
    }

    function scrollToUp() {
      $('html, body').animate({ scrollTop: $('#barra-globocom').height() + $('.g1-header').height() + $('#header').height() }, 600);
      return false;
    }

    function showBtnScrollUp() {
      ($(this).scrollTop() > 700) ? $('.scroll-up').fadeIn() : $('.scroll-up').fadeOut()
    }

})(jQuery);