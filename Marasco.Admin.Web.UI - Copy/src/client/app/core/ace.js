
//jscs:disable requireCamelCaseOrUpperCaseIdentifiers
var App = App || {};

App.marascoUi = (function () {

  var factory = {};

  var _enableSidebar = function () {
    //initiate sidebar function
    var $sidebar = $('.sidebar');

    if ($.fn.ace_sidebar) { //jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      $sidebar.ace_sidebar(); //jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    }

    if ($.fn.ace_sidebar_scroll) { //jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      $sidebar.ace_sidebar_scroll({ //jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        //for other options please see documentation
        'include_toggle': false || ace.vars['safari'] || ace.vars['ios_safari']
        //true = include toggle button in the scrollbars
      });
    }

    if ($.fn.ace_sidebar_hover) { //jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      $sidebar.ace_sidebar_hover({ //jscs:disable requireCamelCaseOrUpperCaseIdentifiers
        'sub_hover_delay': 750,
        'sub_scroll_style': 'no-track scroll-thin scroll-margin scroll-visible'
      });
    }
  };

  var _collapseSidebar = function () {
    var $sidebar = $('.sidebar');
    $sidebar.ace_sidebar('collapse'); //jscs:disable requireCamelCaseOrUpperCaseIdentifiers
  };

  var _basics = function () {
    // for android and ios we don't use "top:auto" when breadcrumbs is fixed
    if (ace.vars['non_auto_fixed']) {
      $('body').addClass('mob-safari');
    }

    //ace.vars['transition'] = !!$.support.transition.end;

    $('body').addClass('no-skin');
    $('body').removeClass('login-layout');
  };

  var _enableDemoAjax = function () {
    if (!$.fn.ace_ajax) { //jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      return;
    }

    if (window.Pace) {
      window.paceOptions = {
        ajax: true,
        document: true,
        eventLag: false // disabled
        //elements: {selectors: ['.page-content-area']}
      };
    }

    var demoAjaxOptions = {
      'close_active': true,

      'default_url': 'page/index',//default hash
      'content_url': function (hash) {
        //***NOTE***
        //this is for Ace demo only, you should change it to return a valid URL
        //please refer to documentation for more info

        if (!hash.match(/^page\//)) {
          return false;
        }
        var path = document.location.pathname;

        //for example in Ace HTML demo version we convert /ajax/index.html#page/gallery
        //to > /ajax/content/gallery.html and load it
        if (path.match(/(\/ajax\/)(index\.html)?/)) {
          return path.replace(/(\/ajax\/)(index\.html)?/, '/ajax/content/' +
            hash.replace(/^page\//, '') + '.html');
        }

        //for example in Ace PHP demo version we convert "ajax.php#page/dashboard"
        //to "ajax.php?page=dashboard" and load it
        return path + '?' + hash.replace(/\//, '=');
      }
    };

    //for IE9 and below we exclude PACE loader (using conditional IE comments)
    //for other browsers we use the following extra ajax loader options
    if (window.Pace) {
      demoAjaxOptions['loading_overlay'] = 'body';//the opaque overlay is applied to 'body'
    }

    //initiate ajax loading on this element( which is .page-content-area[data-ajax-content=true] in Ace's demo)
    $('[data-ajax-content=true]').ace_ajax(demoAjaxOptions);

    //if general error happens and ajax is working, let's stop loading icon & PACE
    $(window).on('error.ace_ajax', function () {
      $('[data-ajax-content=true]').each(function () {
        var $this = $(this);
        if ($this.ace_ajax('working')) {
          if (window.Pace && Pace.running) {
            Pace.stop();
          }
          $this.ace_ajax('stopLoading', true);
        }
      });
    });
  };

  var _sidebarTooltips = function () {
    //tooltip in sidebar items
    $('.sidebar .nav-list .badge[title],.sidebar .nav-list .badge[title]').each(function () {
      var tooltipClass = $(this).attr('class').match(/tooltip\-(?:\w+)/);
      tooltipClass = tooltipClass ? tooltipClass[0] : 'tooltip-error';
      $(this).tooltip({
        'placement': function (context, source) {
          var offset = $(source).offset();

          if (parseInt(offset.left) < parseInt(document.body.scrollWidth / 2)) {
            return 'right';
          }
          return 'left';
        },
        container: 'body',
        template: '<div class="tooltip ' + tooltipClass + '">' +
        '<div class="tooltip-arrow"></div>' +
        '<div class="tooltip-inner"></div></div>'
      });
    });
  };

  var _scrollTopBtn = function () {
    //the scroll to top button
    var scrollBtn = $('.btn-scroll-up');
    if (scrollBtn.length > 0) {
      var isVisible = false;
      $(window).on('scroll.scrollBtn', function () {
        var scroll = ace.helper.scrollTop();
        var h = ace.helper.winHeight();
        var bodySH = document.body.scrollHeight;
        if (scroll > parseInt(h / 4) || (scroll > 0 &&
          bodySH >= h && h + scroll >= bodySH - 1)) {
          //|| for smaller pages, when reached end of page
          if (!isVisible) {
            scrollBtn.addClass('display');
            isVisible = true;
          }
        } else {
          if (isVisible) {
            scrollBtn.removeClass('display');
            isVisible = false;
          }
        }
      }).triggerHandler('scroll.scrollBtn');

      scrollBtn.on(ace.click_event, function () {
        var duration = Math.min(500, Math.max(100, parseInt(ace.helper.scrollTop() / 3)));
        $('html,body').animate({ scrollTop: 0 }, duration);
        return false;
      });
    }
  };

  var _handleScrollbars = function () {
    //add scrollbars for navbar dropdowns
    var hasScroll = !!$.fn.ace_scroll;
    if (hasScroll) {
      $('.dropdown-content').ace_scroll({ reset: false, mouseWheelLock: true });
    }

    //reset scrolls bars on window resize
    if (hasScroll && !ace.vars['old_ie']) {//IE has an issue with widget fullscreen on ajax?!!!
      $(window).on('resize.reset_scroll', function () {
        $('.ace-scroll:not(.scroll-disabled)').not(':hidden').ace_scroll('reset');
      });
      if (hasScroll) {
        $(document).on('settings.ace.reset_scroll', function (e, name) {
          if (name === 'sidebar_collapsed') {
            $('.ace-scroll:not(.scroll-disabled)').not(':hidden').ace_scroll('reset');
          }
        });
      }
    }
  };

  var _dropdownAutoPos = function () {
    //change a dropdown to "dropup" depending on its position
    $(document).on('click.dropdown.pos', '.dropdown-toggle[data-position="auto"]', function () {
      var offset = $(this).offset();
      var parent = $(this.parentNode);

      if (parseInt(offset.top + $(this).height()) + 50 >
        (ace.helper.scrollTop() + ace.helper.winHeight() -
          parent.find('.dropdown-menu').eq(0).height())) {
        parent.addClass('dropup');
      }
      else {
        parent.removeClass('dropup');
      }
    });
  };

  var _navbarHelpers = function () {
    //prevent dropdowns from hiding when a from is clicked
    /**$(document).on('click', '.dropdown-navbar form', function(e){
    e.stopPropagation();
    });*/

    //disable navbar icon animation upon click
    $('.ace-nav [class*="icon-animated-"]').closest('a').one('click', function () {
      var icon = $(this).find('[class*="icon-animated-"]').eq(0);
      var $match = icon.attr('class').match(/icon\-animated\-([\d\w]+)/);
      icon.removeClass($match[0]);
    });

    //prevent dropdowns from hiding when a tab is selected
    $(document).on('click', '.dropdown-navbar .nav-tabs', function (e) {
      e.stopPropagation();
      var $this, href;
      var that = e.target;
      if (($this = $(e.target).closest('[data-toggle=tab]')) && $this.length > 0) {
        $this.tab('show');
        e.preventDefault();
        $(window).triggerHandler('resize.navbar.dropdown');
      }
    });
  };

  var _someBrowserFix = function () {
    //chrome and webkit have a problem here when resizing from 479px to more
    //we should force them redraw the navbar!
    if (ace.vars['webkit']) {
      var aceNav = $('.ace-nav').get(0);
      if (aceNav) {
        $(window).on('resize.webkit_fix', function () {
          ace.helper.redraw(aceNav);
        });
      }
    }

    //fix an issue with ios safari, when an element is fixed and an input receives focus
    if (ace.vars['ios_safari']) {
      $(document).on('ace.settings.ios_fix', function (e, eventName, eventVal) {
        if (eventName !== 'navbar_fixed') {
          return;
        }

        $(document).off('focus.ios_fix blur.ios_fix', 'input,textarea,.wysiwyg-editor');
        if (eventVal === true) {
          $(document).on('focus.ios_fix', 'input,textarea,.wysiwyg-editor', function () {
            $(window).on('scroll.ios_fix', function () {
              var navbar = $('#navbar').get(0);
              if (navbar) {
                ace.helper.redraw(navbar);
              }
            });
          }).on('blur.ios_fix', 'input,textarea,.wysiwyg-editor', function () {
            $(window).off('scroll.ios_fix');
          });
        }
      }).triggerHandler('ace.settings.ios_fix',
        ['navbar_fixed', $('#navbar').css('position') === 'fixed']);
    }
  };

  var _bsCollapseToggle = function () {
    //bootstrap collapse component icon toggle
    $(document).on('hide.bs.collapse show.bs.collapse', function (ev) {
      var panelId = ev.target.getAttribute('id');
      var panel = $('a[href*="#' + panelId + '"]');
      if (panel.length === 0) {
        panel = $('a[data-target*="#' + panelId + '"]');
      }
      if (panel.length === 0) {
        return;
      }

      panel.find(ace.vars['.icon']).each(function () {
        var $icon = $(this);

        var $match;
        var $iconDown = null;
        var $iconUp = null;
        if (($iconDown = $icon.attr('data-icon-show'))) {
          $iconUp = $icon.attr('data-icon-hide');
        } else if ($match === $icon.attr('class').match(/fa\-(.*)\-(up|down)/)) {
          $iconDown = 'fa-' + $match[1] + '-down';
          $iconUp = 'fa-' + $match[1] + '-up';
        }

        if ($iconDown) {
          if (ev.type === 'show') {
            $icon.removeClass($iconDown).addClass($iconUp);
          }
          else {
            $icon.removeClass($iconUp).addClass($iconDown);
          }

          return false; //ignore other icons that match, one is enough
        }

      });
    });
  };

  var _smallDeviceDropdowns = function () {
    if (ace.vars['old_ie']) {
      return;
    }

    $('.ace-nav > li')
      .on('shown.bs.dropdown.navbar', function (e) {
        adjustNavbarDropdown.call(this);
      })
      .on('hidden.bs.dropdown.navbar', function (e) {
        $(window).off('resize.navbar.dropdown');
        resetNavbarDropdown.call(this);
      });

    function adjustNavbarDropdown() {
      var $sub = $(this).find('> .dropdown-menu');
      if ($sub.css('position') === 'fixed') {
        var winWidth = parseInt($(window).width());
        var offsetW = winWidth > 320 ? 60 : (winWidth > 240 ? 40 : 30);
        var availWidth = parseInt(winWidth) - offsetW;
        var availHeight = parseInt($(window).height()) - 30;
        var width = parseInt(Math.min(availWidth, 320));
        //we set 'width' here for text wrappings and spacings to take effect before calculating scrollHeight
        $sub.css('width', width);
        var tabbed = false;
        var extraParts = 0;
        var dropdownContent = $sub.find('.tab-pane.active .dropdown-content.ace-scroll');
        var parentMenu = dropdownContent.closest('.dropdown-menu');
        var scrollHeight = $sub[0].scrollHeight;
        var height = parseInt(Math.min(availHeight, 480, scrollHeight + extraParts));
        if (dropdownContent.length === 0) {
          dropdownContent = $sub.find('.dropdown-content.ace-scroll');
        }
        else if (dropdownContent.length === 1) {
          //sometimes there's no scroll-content, for example in detached scrollbars
          var content = dropdownContent.find('.scroll-content')[0];
          if (content) {
            scrollHeight = content.scrollHeight;
          }
          extraParts += parentMenu.find('.dropdown-header').outerHeight();
          extraParts += parentMenu.find('.dropdown-footer').outerHeight();
          var tabContent = parentMenu.closest('.tab-content');
          if (tabContent.length !== 0) {
            extraParts += tabContent.siblings('.nav-tabs').eq(0).height();
          }
          if (!ace.vars['touch']) {
            dropdownContent.ace_scroll('update', { size: height - extraParts }).
              ace_scroll('enable').ace_scroll('reset');
          }
          else {
            dropdownContent.ace_scroll('disable').
              css('max-height', height - extraParts).addClass('overflow-scroll');
          }
        }
        else {
          tabbed = true;
        }
        var left = parseInt(Math.abs((availWidth + offsetW - width) / 2));
        var top = parseInt(Math.abs((availHeight + 30 - height) / 2));
        var zindex = parseInt($sub.css('z-index')) || 0;
        $sub.css({
          'height': height,
          'left': left,
          'right': 'auto',
          'top': top - (!tabbed ? 1 : 3)
        });
        // if (dropdownContent.length === 1) {
        // }
        $sub.css('height', height + (!tabbed ? 2 : 7));//for bottom border adjustment and tab content paddings
        if ($sub.hasClass('user-menu')) {
          $sub.css('height', '');//because of user-info hiding/showing at different widths,
          //which changes above 'scrollHeight', so we remove it!

          //user menu is re-positioned in small widths
          //but we need to re-position again in small heights as well (modal mode)
          var userInfo = $(this).find('.user-info');
          if (userInfo.length === 1 && userInfo.css('position') === 'fixed') {
            userInfo.css({
              'left': left,
              'right': 'auto',
              'top': top,
              'width': width - 2,
              'max-width': width - 2,
              'z-index': zindex + 1
            });
          }
          else {
            userInfo.css({
              'left': '',
              'right': '',
              'top': '',
              'width': '',
              'max-width': '',
              'z-index': ''
            });
          }
        }
        //dropdown's z-index is limited by parent .navbar's z-index
        //(which doesn't make sense because dropdowns are fixed!)
        //so for example when in 'content-slider' page, fixed modal toggle buttons go above are dropdowns
        //so we increase navbar's z-index to fix this!
        $(this).closest('.navbar.navbar-fixed-top').css('z-index', zindex);
      }
      else {
        if ($sub.length !== 0) {
          resetNavbarDropdown.call(this, $sub);
        }
      }
      var self = this;
      $(window)
        .off('resize.navbar.dropdown')
        .one('resize.navbar.dropdown', function () {
          $(self).triggerHandler('shown.bs.dropdown.navbar');
        });
    }

    //reset scrollbars and user menu
    function resetNavbarDropdown($sub) {
      $sub = $sub || $(this).find('> .dropdown-menu');

      if ($sub.length > 0) {
        $sub
          .css({ 'width': '', 'height': '', 'left': '', 'right': '', 'top': '' })
          .find('.dropdown-content').each(function () {
            if (ace.vars['touch']) {
              $(this).css('max-height', '').removeClass('overflow-scroll');
            }

            var size = parseInt($(this).
              attr('data-size') || 0) || $.fn.ace_scroll.defaults.size;
            $(this).ace_scroll('update', { size: size }).
              ace_scroll('enable').ace_scroll('reset');
          });

        if ($sub.hasClass('user-menu')) {
          var userInfo =
            $(this).find('.user-info')
              .css({
                'left': '',
                'right': '',
                'top': '',
                'width': '',
                'max-width': '',
                'z-index': ''
              });
        }
      }

      $(this).closest('.navbar').css('z-index', '');
    }

  };

  var _authenticateBasics = function () {
    $('body').removeClass('no-skin');
    $('body').addClass('login-layout');
  };

  //#endregion

  //#region Publicly Exposed Api

  factory.basics = _basics;
  factory.enableSidebar = _enableSidebar;
  factory.collapseSidebar = _collapseSidebar;
  factory.enableDemoAjax = _enableDemoAjax;
  factory.sidebarTooltips = _sidebarTooltips;
  factory.scrollTopBtn = _scrollTopBtn;
  factory.handleScrollbars = _handleScrollbars;
  factory.dropdownAutoPos = _dropdownAutoPos;
  factory.navbarHelpers = _navbarHelpers;
  factory.someBrowserFix = _someBrowserFix;
  factory.bsCollapseToggle = _bsCollapseToggle;
  factory.smallDeviceDropdowns = _smallDeviceDropdowns;
  factory.authenticateBasics = _authenticateBasics;

  //#endregion

  return factory;
})();
