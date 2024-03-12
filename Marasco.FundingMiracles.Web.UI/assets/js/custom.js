var App = App || {};

App.mallDub = function () {

  //#region === Initialize ===

  var p = {};

  var waitForFinalEvent = function () {
    var b = {};
    return function (c, d, a) {
      a || (a = "I am a banana!");
      b[a] && clearTimeout(b[a]);
      b[a] = setTimeout(c, d);
    }
  }();
  var fullDateString = new Date();

  //#endregion

  p.validateEmail = function(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
      return false;
    }

    return true;
  }

  p.randomator = function(numDigits) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < numDigits; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  p.randomIntFromInterval = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  p.initNavBarScroll = function(elementId, parentElementId, affixTop) {

    jQuery(elementId).show();
    jQuery(elementId).height(jQuery(parentElementId).height());

    jQuery(parentElementId).affix({
      offset: {
        top: jQuery(parentElementId).offset().top
      }
    });

    var offset = jQuery(elementId).offset();
    var w = jQuery(window);

    if (affixTop === true) {

      jQuery(window).scroll(function () {

        showHide(w.scrollTop(), offset.top);
        //if ($(elementId).offset().top > 80) {
        //  $(".navbar-fixed-top").addClass("top-nav-collapse");
        //} else {
        //  $(".navbar-fixed-top").removeClass("top-nav-collapse");
        //}
      });

      w.one('scroll', function () {
        //console.log($(this).scrollTop());
        showHide(w.scrollTop(), offset.top);
        if (p.isBreakpoint('xs')) {
          $('#donate-bar-nav').css({ 'width': '100%' });
        }
      });


      setTimeout(function() {
        if (w.scrollTop() === 0) {
          jQuery(elementId).hide();
        }
      }, 1);

    }

    function showHide(currentPosition, offsetTop) {
      if (currentPosition < offsetTop) {
        jQuery(elementId).hide();
      } else {
        jQuery(elementId).show();
      }
    }
  }

  //Check the bootstrap size
  p.isBreakpoint = function( alias ) {
    return $('.device-' + alias).is(':visible');
  }
p.manualClickSearch = function() {
    if (jQuery('.search-btn').hasClass('fa-search')) {
      jQuery('.search-open').fadeIn(500);
      jQuery('.search-btn').removeClass('fa-search');
      jQuery('.search-btn').addClass('fa-times');
    } else {
      jQuery('.search-open').fadeOut(500);
      jQuery('.search-btn').addClass('fa-search');
      jQuery('.search-btn').removeClass('fa-times');
    }
  }

  p.initToastr =function() {
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "positionClass": "toast-top-full-width",
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "3500",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
  }

  p.initTooltip = function () {
    jQuery(document).ready(function() {
      jQuery(document).tooltip({
        position: {
          my: "center bottom-20",
          at: "center top",
          using: function(position, feedback) {
            jQuery(this).css(position);
            jQuery("<div>")
              .addClass("arrow")
              .addClass(feedback.vertical)
              .addClass(feedback.horizontal)
              .appendTo(this);
          }
        }
      });
    });

  }
  //Master Slider
  p.initMasterSliderShowcase2 = function (masterSliderId) {
    var slider = new MasterSlider();

    slider.control('arrows');
    slider.control('thumblist', {
      autohide: false,
      dir: 'h',
      arrows: false,
      align: 'bottom',
      width: 180,
      height: 170,
      margin: 5,
      space: 5
    });

    slider.setup(masterSliderId, {
      width: 550,
      height: 550,
      space: 5,
      view: 'fade',
      loop: true
    });

    return slider;
  }

  p.setDomainColor = function (color, skin, layout) {
    jQuery('#style_color').attr("href", "/assets/css/theme-colors/" + color + ".min.css");
    jQuery('#style_color_item').attr("href", "/assets/css/theme-colors/" + color + "-custom.min.css");
    if (skin == 'Light') {
      //jQuery('#logo-header').attr("src", "assets/img/logo1-" + color + ".png");
      //jQuery('#logo-footer').attr("src", "assets/img/logo2-" + color + ".png");
    } else if (skin == 'Dark') {
      //jQuery('#logo-header').attr("src", "assets/img/logo1-" + color + ".png");
      //jQuery('#logo-footer').attr("src", "assets/img/logo2-" + color + ".png");
    }

    //Theme
    if (skin === 'Dark') {
      jQuery(".handle-skins-btn").removeClass("active-switcher-btn");
      jQuery("body").addClass("dark");
    } else {
      jQuery(".skins-btn").removeClass("active-switcher-btn");
      jQuery("body").removeClass("dark");
    };

    //Boxed Layout
    if (layout === 'Boxed') {
      jQuery(".wide-layout-btn").removeClass("active-switcher-btn");
      jQuery("body").addClass("boxed-layout container");
    } else {
      jQuery(".boxed-layout-btn").removeClass("active-switcher-btn");
      jQuery("body").removeClass("boxed-layout container");
    }
  }

  p.initOwlCarousel = function (elementId) {
    jQuery(document).ready(function () {
      //Owl Slider
      jQuery(document).ready(function () {
        var owl = jQuery('.owl-slider');
        owl.owlCarousel({
          items: [4],
          itemsDesktop: [1000, 3], //3 items between 1000px and 901px
          itemsDesktopSmall: [979, 2], //2 items between 901px
          itemsTablet: [600, 1], //1 items between 600 and 0;
          slideSpeed: 1000
        });

        // Custom Navigation Events
        jQuery(".next").click(function() {
          owl.trigger('owl.next');
        });
        jQuery(".prev").click(function() {
          owl.trigger('owl.prev');
        });
      });
    });

    //Owl Slider v2
    jQuery(document).ready(function () {
      var owl = jQuery(".owl-slider-v2");
      owl.owlCarousel({
        items: 5,
        itemsDesktop: [1000, 4], //4 items between 1000px and 901px
        itemsDesktopSmall: [979, 3], //3 items between 901px
        itemsTablet: [600, 2], //2 items between 600 and 0;
      });
    });

    //Owl Slider v3
    jQuery(document).ready(function () {
      var owl = jQuery(".owl-slider-v3");
      owl.owlCarousel({
        items: 1,
        itemsDesktop: [1000, 1], //1 items between 1000px and 901px
        itemsDesktopSmall: [979, 1], //1 items between 901px
        itemsTablet: [600, 1], //1 items between 600 and 0;
        itemsMobile: [479, 1] //1 itemsMobile disabled - inherit from itemsTablet option
      });
    });

    jQuery(document).ready(function () {
      //Owl Slider v4
      jQuery(document).ready(function () {
        var owl = jQuery(".owl-slider-v4");
        owl.owlCarousel({
          items: [5],
          itemsDesktop: [1000, 4], //4 items between 1000px and 901px
          itemsTablet: [600, 2], //2 items between 600 and 0;
          itemsMobile: [479, 2], //2 itemsMobile disabled - inherit from itemsTablet option
          slideSpeed: 1000
        });

        // Custom Navigation Events
        jQuery(".next").click(function() {
          owl.trigger('owl.next');
        });
        jQuery(".prev").click(function() {
          owl.trigger('owl.prev');
        });
      });
    });

    jQuery(document).ready(function () {
      //Owl Slider
      jQuery(document).ready(function () {
        var owl = jQuery(".owl-twitter");
        owl.owlCarousel({
          items: [1]
        });

        // Custom Navigation Events
        jQuery(".next-v2").click(function() {
          owl.trigger('owl.next');
        });
        jQuery(".prev-v3").click(function() {
          owl.trigger('owl.prev');
        });
      });
    });
  }

  p.initBootstrapListener = function(alias, callback, converse) {

    $(window).resize(function () {
      waitForFinalEvent(function() {

        if (p.isBreakpoint(alias)) {
          callback(alias);
        } else {
          converse(alias);
        }

      }, 1, fullDateString.getTime());
    });
  }

  return p;
}();