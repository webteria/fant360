
$(document).ready(function(){

	function fixSideMenu() {
		var $cache = $('.side-menu');
		if ($(window).scrollTop() > 140)
		  $cache.css({
		    'position': 'fixed',
		    'top': '10px'
		  });
		else
		  $cache.css({
		    'position': 'fixed',
		    'top': '174'
		  });
	}
	$(window).scroll(fixSideMenu);
	fixSideMenu();

	// $('.side-menu').scrollTop

	$.loadScript = function (url, callback) {
		$.ajax({
			url: url,
			dataType: 'script',
			success: callback,
			async: true
		});
	}
		
	/*	
	$.get('boilerplate_fantastico/index.html', function(data){
		$('.header-fantastico').html(data);
	});
	*/

	$('body').on('click', '.scrollTop', function(){		
		var body = $("html, body");
		body.stop().animate({scrollTop: $('body').offset().top}, 500);	
		$('.side-menu').removeClass('active');	
	});

	$.get('globocom-bar.html', function(data){
		$('.header-fantastico').html(data);
	});	

	var clear_cache = new Date().getTime();

	$.getJSON('interface.json?a='+clear_cache, function(data){

		// $('body').css({backgroundImage: 'url('+data.background+') !important;'});
		$('body').attr('style', 'background-image: url('+data.background+') !important; background-position-y: 100px;');
		$('.intro p').html(data.intro_text);
		$('.intro .video img').attr('src', data.intro_thumb);
		//$('.intro .video iframe').attr('src', data.intro_video);

	});

	$.getJSON('series.json?a='+clear_cache, function(data){	

		render_side_menu(data);

		$.each( data, function( key, val ) {
			
			var clone = $('.videos-list .clone').clone();

			clone.attr('data-serie-id', val.id);			
			clone.addClass('data_serie_id_'+val.id);

			clone.find('.category').html(val.title);

			var title_line = '';
			$.each(val.description, function(key, val){
				title_line += '<div class="title-line">'+val+'</div><br />';
			});		
			clone.find('.title').html(title_line);	

			clone.find('.thumb').attr('data-serie-id', val.id);
			clone.find('.thumb').attr('data-key', key);			
			clone.find('.thumb img').attr('src', val.videos[0].thumb);			

			var more_videos = '';

			$.each(val.videos, function(key, video){
				if(key > 0){
					more_videos += '<div><a href="javascript:void(0);" class="open-video-fullscreen" data-serie-id="'+val.id+'" data-key="'+key+'"><img src="'+video.thumb+'"></a></div>';
				}				
			});		
			clone.find('.more-videos').html('');
			clone.find('.more-videos').append(more_videos);						

			$('.videos-list').append(clone);
			clone.removeClass('hide');
			clone.removeClass('clone');	

			/*
			clone.find('.more-videos').slick({
				infinite: true, 
				slidesToShow: 3, 
				slidesToScroll: 3, 
				dots: true, 
				arrows: false, 
				adaptiveHeight: true
			}) ;
			*/
			
		});	

		setTimeout(function(){

			var query_string = getUrlVars();		

			if(query_string.s){			

				var video_share = query_string.s.split('_video_key_');
				
				$('.open-video-fullscreen').each(function(){

					var serie_id = $(this).data('serie-id');
					var video_key = $(this).data('key');						

					if(serie_id == video_share[0] && video_key == video_share[1]){
						
						$(this).click();
						
					}

				});

			}			

		}, 1000);			

	});	

	$('body').on('click', '.open-side-menu', function(){
		$('.side-menu').addClass('active');
		fixSideMenu();
	});

	$('body').on('click', '.close-side-menu', function(){
		$('.side-menu').removeClass('active');
	});	

	$('body').on('click', '.open-intro-video-fullscreen', function(){

		if(isMobile()){
			var wrapper = $('.video-mobile-open');
			$('.wrapper-content').addClass('video-mobile-is-open');
			$('html, body').scrollTop($('body').offset().top);
		}else{
			var wrapper = $('.video-fullscreen');
		}

		wrapper.addClass('active');
		
		$.getJSON('interface.json?a='+clear_cache, function(data){

			wrapper.find('iframe').attr('src', data.intro_video );
			
			wrapper.find('.video-header .pull-left').hide();
			wrapper.find('.video-header .pull-right a').hide();
			wrapper.find('.video-header .pull-right .show-intro-video').show();			
			
		});

	});

	$('body').on('click', '.open-video-fullscreen', function(){

		$('.video-details').removeClass('open');		
		$('.video-details .more-videos').replaceWith('<div class="more-videos multiple-items mt-20"></div>');
		$('.video-details .more-videos').css({opacity: 0});

		var serie_id = $(this).data('serie-id');
		var video_key = $(this).data('key');

		var facebook_link = $('.video-fullscreen .fa-facebook').data('href');
		$('.video-fullscreen .fa-facebook').attr('href', facebook_link+'?s='+serie_id+'_video_key_'+video_key);
		$('.video-details .fa-facebook').attr('href', facebook_link+'?s='+serie_id+'_video_key_'+video_key);

		var twitter_link = $('.video-fullscreen .fa-twitter').data('href');
		$('.video-fullscreen .fa-twitter').attr('href', twitter_link+'?s='+serie_id+'_video_key_'+video_key);
		$('.video-details .fa-twitter').attr('href', twitter_link+'?s='+serie_id+'_video_key_'+video_key);		

		var clear_cache = new Date().getTime();
		
		$.getJSON('series.json?b='+clear_cache, function(data){		

			$.each( data, function( key, val ) {

				if(val.id == serie_id){

					if(isMobile()){

						var wrapper = $('.video-mobile-open');

						$('.wrapper-content').addClass('video-mobile-is-open');
						$('html, body').scrollTop($('body').offset().top);

					}else{

						var wrapper = $('.video-fullscreen');

					}

					wrapper.find('.category').html(val.title);

					var title_line = '';
					$.each(val.videos[video_key].title, function(key, val){
						title_line += '<div class="title-line">'+val+'</div><br />';
					});		
					wrapper.find('.title').html(title_line);	


					$('.video-details').find('.description p').html(val.videos[video_key].description);
					$('.video-details').find('.creditos p').html(val.videos[video_key].credits);

					var more_videos = '';
					$.each(val.videos, function(key_video, video){
						if(key_video != key){
							more_videos += '<div><a href="javascript:void(0);" class="open-video-fullscreen" data-serie-id="'+val.id+'" data-key="'+key_video+'"><img src="'+video.thumb+'"></a></div>';							
						}
					});		

					$('.video-details').find('.more-videos').html('');
					$('.video-details').find('.more-videos').append(more_videos);	

					wrapper.find('iframe').attr('src', val.videos[video_key].video);						

					wrapper.addClass('active');										

					$('.video-details .more-videos').slick({
						infinite: true, 
						slidesToShow: 3, 
						slidesToScroll: 3, 
						dots: true, 
						arrows: false, 
						adaptiveHeight: true
					});	

					// $('.video-details .more-videos').slick('reinit');							

				}			
				
			});							

		});				

	});	

	$('body').on('click', '.close-video-fullscreen', function(){

		if(isMobile()){
			$('.wrapper-content').removeClass('video-mobile-is-open');
		}else{
			$('.video-fullscreen').removeClass('active');	
		}		
		$('.video-details').removeClass('open');

		$('.video-fullscreen').find('.video-header .pull-left').show();
		$('.video-fullscreen').find('.video-header .pull-right a').show();	

		$('.video-details .more-videos').replaceWith('<div class="more-videos multiple-items mt-20"></div>');
	
		if(isMobile()){
			var wrapper = $('.video-mobile-open');
		}else{
			var wrapper = $('.video-fullscreen');
		}

		wrapper.find('iframe').attr('src', 'empty.html' );
	});	

	$('body').on('click', '.open-video-fullscreen-details', function(){
		$('.video-details').toggleClass('open');
		$('.video-details .more-videos').css({opacity: 1});		
	});	


	$('body').on('click', '.load-serie', function(){

		// $('.intro p').hide();
		// $('.intro .video').hide();
		//$('.intro .logo img').css({width: '20%'});
		$('.side-menu').removeClass('active');

		var serie_id = $(this).data('serie-id');

		var clear_cache = new Date().getTime();

		// $('.videos-list .video').not('.clone').remove();

		var body = $("html, body");
		body.stop().animate({scrollTop: $('.video.data_serie_id_'+serie_id).offset().top - 100}, 500);

		// $('html, body').scrollTop($('.video.data_serie_id_'+serie_id).offset().top - 100);

		/*
		$.getJSON('series.json?a='+clear_cache, function(data){				

			$.each( data, function( key, val ) {

				if(val.id == serie_id){

					var clone = $('.videos-list .clone').clone();

					// clone.attr('data-serie-id', val.id);
					// clone.attr('data-key', key);

					clone.find('.category').html(val.title);

					var title_line = '';
					$.each(val.description, function(key, val){
						title_line += '<div class="title-line">'+val+'</div><br />';
					});		
					clone.find('.title').html(title_line);	
					
					clone.find('.thumb').attr('data-serie-id', val.id);
					clone.find('.thumb').attr('data-key', key);			
					clone.find('.thumb img').attr('src', val.videos[0].thumb);			

					var more_videos = '';
					$.each(val.videos, function(key_video, video){
						if(key_video != key){
							more_videos += '<div><a href="javascript:void(0);" class="open-video-fullscreen" data-serie-id="'+val.id+'" data-key="'+key+'"><img src="'+video.thumb+'"></a></div>';
						}						
					});		
					clone.find('.more-videos').html('');
					clone.find('.more-videos').append(more_videos);						

					$('.videos-list').append(clone);
					clone.removeClass('hide');
					clone.removeClass('clone');	
					
				}			
				
			});	
			
			clone.find('.more-videos').slick({
				infinite: true, 
				slidesToShow: 3, 
				slidesToScroll: 3, 
				dots: true, 
				arrows: false, 
				adaptiveHeight: true
			});		

			clone.find('.more-videos').slick('reinit');		
			

		});
		*/


	});

	function render_side_menu(data){

		var menu = '';

		$.each(data, function(key, val){

			menu += '<li><a href="javascript:void(0);" class="load-serie" data-serie-id="'+val.id+'">'+val.title+'</a></li>';

		});

		$('.side-menu ul').html(menu);

	}

	function isMobile(){

		var isMobile = false; //initiate as false

		// device detection
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
		

		if(!isMobile){
			if($(this).width() <= '768'){
				isMobile = true;
			}
		}

		return isMobile;

	}	

	function getUrlVars()
	{
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	}

	$.loadScript( 
		'assets/vendors/slick.1.6.0/slick.min.js', 
		function(){ 
			$('.more-videos').slick({
				infinite: true, 
				slidesToShow: 3, 
				slidesToScroll: 3, 
				dots: true, 
				arrows: false, 
				adaptiveHeight: true
			}) ;
		}
	) ;


});


