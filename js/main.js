;(function () {

	'use strict';



	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}

	};


	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	/* Smooth Scrolling
 	* ------------------------------------------------------ */
 	var clSmoothScroll = function() {

 			$('.smoothscroll').on('click', function (e) {
 					var target = this.hash,
 					$target    = $(target);

 							e.preventDefault();
 							e.stopPropagation();

 					$('html, body').stop().animate({
 							'scrollTop': $target.offset().top
 					}, cfg.scrollDuration, 'swing').promise().done(function () {

 							// check if menu is open
 							if ($('body').hasClass('menu-is-open')) {
 									$('.header-menu-toggle').trigger('click');
 							}

 							window.location.hash = target;
 					});
 			});

 	};



	//Add OnepageNav / Sidebar
	function onePageFixedNav() {
	    if($('body').length){
	      // Add scrollspy to
	      $('body').scrollspy({target: ".theme-main-header", offset: 1000});

	      // Add smooth scrolling on all links inside the one-page-menu
	      $(".one-page-menu li a").on('click', function(event) {
	        // Make sure this.hash has a value before overriding default behavior
	        if (this.hash !== "") {
	          // Prevent default anchor click behavior
	          event.preventDefault();

	          // Store hash
	          var hash = this.hash;

	          // Using jQuery's animate() method to add smooth page scroll
	          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	          $('html, body').animate({
	            scrollTop: $(hash).offset().top
	          }, 1000, function(){

	            // Add hash (#) to URL when done scrolling (default click behavior)
	            window.location.hash = hash;
	          });
	        }  // End if
	      });
	    }
	}


	var counterWayPoint = function() {
		if ($('#style-counter').length > 0 ) {
			$('#style-counter').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};


	// Mixitup gallery
	function mixitupGallery () {
	  var mixItem = $(".project-gallery");
	  if (mixItem.length) {
	        mixItem .mixItUp()
	  };
	}

	$(".project-menu > .filter").click(function(){
	    $(".project-menu > .filter").removeClass("active");
	    $(this).addClass("active");
	});



	//Contact Form Validation
	function contactFormValidation () {
	  var activeForm = $('.form-validation');
	  if(activeForm.length){
	    activeForm.validate({ // initialize the plugin
	      rules: {
	        Fname: {
	          required: true
	        },
	        Lname: {
	          required: true
	        },
	        email: {
	          required: true,
	          email: true
	        },
	        sub: {
	          required: true
	        },
	        message: {
	          required: true
	        }
	      },
	      submitHandler: function(form) {
	                $(form).ajaxSubmit({
	                    success: function() {
	                        $('.form-validation :input').attr('disabled', 'disabled');
	                        activeForm.fadeTo( "slow", 1, function() {
	                            $(this).find(':input').attr('disabled', 'disabled');
	                            $(this).find('label').css('cursor','default');
	                            $('#alert-success').fadeIn();
	                        });
	                    },
	                    error: function() {
	                        activeForm.fadeTo( "slow", 1, function() {
	                            $('#alert-error').fadeIn();
	                        });
	                    }
	                });
	            }
	        });
	  }
	}


	// Close suddess Alret
	function closeSuccessAlert () {
	  var closeButton = $ (".closeAlert");
	  if(closeButton.length) {
	      closeButton.on('click', function(){
	        $(".alert-wrapper").fadeOut();
	      });
	      closeButton.on('click', function(){
	        $(".alert-wrapper").fadeOut();
	      })
	  }
	}


	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});

				}, 100);

			}

		} , { offset: '85%' } );
	};


	var burgerMenu = function() {

		$('.js-style-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');
			}
		});



	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#style-aside, .js-style-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-style-nav-toggle').removeClass('active');

	    	}

	    }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-style-nav-toggle').removeClass('active');

	    	}
		});

	};

	var clickMenu = function() {

		$('#navbar-collapse-1 a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar-collapse-1');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 70
			    	}, 600);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-style-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar-collapse-1 > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');

		$section.waypoint(function(direction) {

		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};



	window.onscroll = function() {myFixedNav()};

	var header = document.getElementById("myHeader");
	var sticky = header.offsetTop;

	function myFixedNav() {
	  if (window.pageYOffset >= sticky) {
	    header.classList.add("sticky");
	  } else {
	    header.classList.remove("sticky");
	  }
	}


	var sliderMain = function() {

	  	$('#style-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};

	var stickyFunction = function() {

		var h = $('.image-content').outerHeight();

		if ($(window).width() <= 992 ) {
			$("#sticky_item").trigger("sticky_kit:detach");
		} else {
			$('.sticky-parent').removeClass('stick-detach');
			$("#sticky_item").trigger("sticky_kit:detach");
			$("#sticky_item").trigger("sticky_kit:unstick");
		}

		$(window).resize(function(){
			var h = $('.image-content').outerHeight();
			$('.sticky-parent').css('height', h);


			if ($(window).width() <= 992 ) {
				$("#sticky_item").trigger("sticky_kit:detach");
			} else {
				$('.sticky-parent').removeClass('stick-detach');
				$("#sticky_item").trigger("sticky_kit:detach");
				$("#sticky_item").trigger("sticky_kit:unstick");

				$("#sticky_item").stick_in_parent();
			}




		});

		$('.sticky-parent').css('height', h);

		$("#sticky_item").stick_in_parent();

	};

	var owlCrouselFeatureSlide = function() {
		$('.owl-carousel').owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:true,
		   dots: false,
		   autoHeight: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		})
	};

	// Document on load.
	$(function(){
		fullHeight();
		counter();
		counterWayPoint();
		contentWayPoint();
		burgerMenu();
		clSmoothScroll();
		clickMenu();
		// navActive();
		navigationSection();
		// windowScroll();
		mixitupGallery ();
		closeSuccessAlert ();
		contactFormValidation ();
		myFixedNav();
		onePageFixedNav();


		mobileMenuOutsideClick();
		sliderMain();
		stickyFunction();
		owlCrouselFeatureSlide();
	});


}());
