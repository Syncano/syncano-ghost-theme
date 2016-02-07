
jQuery(document).ready(function() {
	"use strict";


	(function(){
		configureRetinaImages();
		configurePagination();
		configureHighlighter();
		configureCopyright();
		configureVideos();
		configureComments();
		configureAnalytics();
		configurePostSubtitle();
		configureSubscription();
		configureHeader();
		configurePostHeader();
		configurePostContents();
	})();


	// HIDE EMPTY PAGINATION
	function configurePagination(){
		if($('.pagination a').length == 0){
			$('.pagination').hide();
		}
	}


	// SYNTAX HIGHLIGHTER
	function configureHighlighter(){
		$('pre code').each(function(index){
			if(typeof jQuery(this).attr('data-language') == 'undefined' || jQuery(this).attr('data-language') == false){
				jQuery(this).attr('data-language', 'generic');
			}
		});
		if(config.highlightcode == true){
			Rainbow.color();
		}
	}


	// COPYRIGHT DISCLAIMER
	function configureCopyright(){
		if(config.show_ecko_disclaimer == false){
			jQuery('.copyright .ecko').hide();
		}
	}


	// FITVIDS
	function configureVideos(){
		jQuery(".postcontents, .format-video, .format-audio").fitVids();
	}


	// COMMENTS
	function configureComments(){
		if(config.disqus_shortname != '' && config.disqus_shortname != null && config.disqus_shortname != undefined){
			if(jQuery('.commentitems').length > 0){
					if(config.autoload_comments == false){
						jQuery('.commenttitle').text('View Comments');
						jQuery('.commentitems').hide();
					}else{
						loadComments();
					}
			}
		}
	}

	function loadComments(){
		if(config.disqus_shortname != ''){
			var disqus_shortname = config.disqus_shortname;
			(function() {
				var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
				dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
				(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
			})();
		}
	}

	jQuery('.commentheader, .showcomments').click(function(){
		jQuery('.commentitems').slideDown(500);
		jQuery('.commenttitle').html('Comments');
		jQuery('.commentheader').css('cursor', 'default');
		jQuery('html, body').animate({
			scrollTop: jQuery("#comments").offset().top
		}, 800);
		loadComments();
	});


	// ANALYTICS
	function configureAnalytics(){
		if(config.analytics_id != '' && config.analytics_id != null && config.analytics_id != undefined){
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			ga('create', config.analytics_id, 'auto');
			ga('send', 'pageview');
		}
	}


	// RETINA IMAGES
	function configureRetinaImages(){
		jQuery('img').attr('data-no-retina', 'true');
		jQuery('img.retina').removeAttr('data-no-retina', 'false');
	}


	// POST SUBTITLE
	function configurePostSubtitle(){
		if(jQuery('body.post-template .subtitle').length > 0){
			jQuery('.posttitle .excerpt').text(jQuery('body.post-template .subtitle').text());
		}
	}


	// SERACH TOGGLE
	jQuery('.showsearch').click(function(){
		jQuery('.searchoverlay').fadeIn(500);
		jQuery('.searchoverlay .query').focus();
	});

	jQuery('.closesearch').click(function(){
		jQuery('.searchoverlay').fadeOut(500);
	});


	// SEARCH SUBMIT
	jQuery('.searchform .submit').click(function(){
		jQuery(this).parent('form').submit();
	});


	// FLOATING HEADER
	function configureHeader(){
		if(jQuery('.cover').length > 0){
			jQuery('.headroom').css('display', 'none');
			jQuery('footer.postinfo').css('display', 'none');
			jQuery('.cover').waypoint(function(direction) {
				if(direction == "down") jQuery('.headroom').css('display', 'block');
				if(direction == "up") jQuery('.headroom').fadeOut(200);
			}, { offset: -Math.abs(jQuery('.cover').height()) });
			jQuery('.cover').waypoint(function(direction) {
				if(direction == "down") jQuery('footer.postinfo').css('display', 'block');
				if(direction == "up") jQuery('footer.postinfo').fadeOut(200);
			}, { offset: -75 });
		}else{
			jQuery('.headroom').css('display', 'block');
		}

		if(jQuery(".headroom").length > 0){
			Headroom.options['offset'] = 50;
			Headroom.options['tolerance']['up'] = 20;
			Headroom.options['tolerance']['down'] = 10;
			Headroom.options['onUnpin'] = function(){
				jQuery('.sub-menu').slideUp();
			};
			var header = document.querySelector(".headroom");
			var headroom  = new Headroom(header);
			headroom.init();
		}
	}


	// DRAWER
	function openDrawer(){
		jQuery('.drawer').addClass('show');
		jQuery('.pagewrapper').addClass('slide');	
		jQuery('.bloginfo').addClass('slide');
		jQuery('.searchoverlay').addClass('slide');
		jQuery('footer.postinfo').addClass('slide');
		jQuery('.showdrawer i').removeClass('fa-navicon');
		jQuery('.showdrawer i').addClass('fa-times');
		setTimeout(function(){ jQuery('.pagewrapper').addClass('slide-completed') }, 500);
	}

	function closeDrawer(){
		jQuery('.drawer').removeClass('show');
		jQuery('.pagewrapper').removeClass('slide');
		jQuery('.pagewrapper').removeClass('slide-completed');
		jQuery('.bloginfo').removeClass('slide');
		jQuery('.searchoverlay').removeClass('slide');
		jQuery('footer.postinfo').removeClass('slide');
		jQuery('.showdrawer i').addClass('fa-navicon');
		jQuery('.showdrawer i').removeClass('fa-times');
	}

	jQuery(document).on("click", ".pagewrapper.slide-completed", function(){
		closeDrawer();
	});

	jQuery('.showdrawer').click(function(){
		if(!jQuery('.drawer').hasClass('show')){
			openDrawer();
		}else{
			closeDrawer();
		}
	});

	jQuery('.closedrawer').click(function(){
		closeDrawer();
	});


	// WIDGET - SUBSCRIPTION
	function configureSubscription(){
		jQuery('input.email').attr('placeholder', 'Email');
	}


	// FASTCLICK
	FastClick.attach(document.body);


	// NAVIGATION ARROWS
	jQuery('.widget.navigation > ul > li.menu-item-has-children > a, nav.main li.menu-item-has-children > a').each(function(){
		jQuery(this).html(jQuery(this).text() + '<i class="fa fa-chevron-down"></i>');
	});
	
	jQuery('.drawer li.menu-item-has-children > a').on("click", function(){
		var parent = jQuery(this).parent();
		jQuery('a i', parent).toggleClass('fa-chevron-down');
		jQuery('a i', parent).toggleClass('fa-chevron-up');
		jQuery('.sub-menu', parent).slideToggle();
		return false;
	});

	jQuery('li.menu-item-has-children > a').on("click", function(){
		if(jQuery(this).attr('href') == "#"){
			return false;
		}
	});


	// COVER SCROLL
	jQuery('.mouse').click(function(){
		jQuery('html, body').animate({
			scrollTop: jQuery(".cover").height()
		}, 1000);
	});


	// BACK TO TOP
	jQuery('.backtotop').click(function(){
		jQuery('html, body').animate({
			scrollTop: 0
		}, 600);
	});


	// POST FOOTER CONTENT TRANSITION
	jQuery('.postbottom').waypoint(function(direction) {
		if(direction == "down"){
			jQuery('.default').fadeOut(200, function(){
				jQuery('.postinfo .relatedposts').fadeIn(200);
			});
		}
		if(direction == "up"){
			jQuery('.postinfo .relatedposts').fadeOut(200, function(){
				jQuery('.default').fadeIn(200);
			});
		}
	}, { offset:'100%' });


	// POST TITLE OPACITY FADE
	function configurePostHeader(){
		if(jQuery('body.post-template').length > 0 && jQuery(window).width() > 880){
			if(jQuery('.cover').attr('data-opacity') == "0.3"){
				var header = jQuery('.cover');
				var range = jQuery('.cover').height();
				jQuery( window ).resize(function() {
					header = jQuery('.cover');
					range = jQuery('.cover').height();
				});
				jQuery(window).on('scroll', function () {
					var st = jQuery(this).scrollTop();
					header.each(function () {
						var offset = jQuery(this).offset().top;
						var height = jQuery(this).outerHeight();
						offset = offset + height / 1;
						jQuery('.cover .background').css({ 'opacity': 0.2 + (st - offset + range) / (range / 2) });
						jQuery('.cover .posttitle').css({ 'opacity': 1.0 - (st - offset + range) / (range / 1.5) });
					});
				});
			}
		}
	}


	// SHOW FOOTER SOCIAL
	jQuery('.showsocial').click(function(){
		jQuery('footer.postinfo .socialoptions').fadeToggle(200);
	});
	jQuery('.closeshare').click(function(){
		jQuery('footer.postinfo .socialoptions').fadeOut(200);
	});


	// COVER RESIZE
	function fixIOSViewPort(){
		if(navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i)){
			var height = Math.floor(jQuery(window).height() * (jQuery('.cover').attr('data-height') / 100));
			jQuery('.cover').css('height', height);	
		}
	}
	
	if(navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i)){
		fixIOSViewPort();
		jQuery(window).resize(function() { fixIOSViewPort(); });
	}


	// POST CONTENTS
	function configurePostContents(){

		jQuery('.postcontents p').has('img[alt="full"]').each(function(){
			jQuery(this).addClass('full');
		});

		jQuery('.postcontents p').has('img[alt="wide"]').each(function(){
			jQuery(this).addClass('wide');
		});

	}


	// LIGHTBOX
	jQuery('.postcontents a').has("img").magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom',
		image: {
			verticalFit: true
		},
		gallery: {
			enabled:true
		},
		zoom: {
			enabled: true,
			duration: 300
		}
	});

	jQuery('.eckogallery, .gallery').each(function() {
		jQuery(this).magnificPopup({
			delegate: 'a',
			type: 'image',
			mainClass: 'mfp-no-margins mfp-with-zoom',
			gallery: {
				enabled:true
			},
			image: {
				verticalFit: true
			},
			zoom: {
				enabled: true,
				duration: 300
			}
		});
	});


});
