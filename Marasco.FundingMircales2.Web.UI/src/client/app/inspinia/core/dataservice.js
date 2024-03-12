/* global Pace: true*/
(function () {
    'use strict';

    angular
        .module('mars.inspinia.core')
        .factory('olcaUIFactory', olcaUIFactory);

    olcaUIFactory.$inject = ['toastr', 'ace'];

    function olcaUIFactory(toastr, ace) {
        var factory = {
            basics: _basics,
            enableSidebar: _enableSidebar,
            collapseSidebar: _collapseSidebar,
            enableDemoAjax: _enableDemoAjax,
            sidebarTooltips: _sidebarTooltips,
            scrollTopBtn: _scrollTopBtn,
            handleScrollbars: _handleScrollbars,
            dropdownAutoPos: _dropdownAutoPos,
            navbarHelpers: _navbarHelpers,
            someBrowserFix: _someBrowserFix,
            bsCollapseToggle: _bsCollapseToggle,
            smallDeviceDropdowns: _smallDeviceDropdowns,
            authenticateBasics: _authenticateBasics,
            initToastr: _initToastr,
            initChosen: _initChosen
        };

        return factory;

        //#region === Private Methods ===
        function _enableSidebar() {
            //initiate sidebar function
            var sidebar = angular.element('.sidebar');

            if (angular.element.fn['ace_sidebar']) {
                sidebar['ace_sidebar']();
            }

            if (angular.element.fn['ace_sidebar_scroll']) {
                sidebar['ace_sidebar_scroll']({
                    //for other options please see documentation
                    //true = include toggle button in the scrollbars
                    'include_toggle': false || ace.vars['safari'] || ace.vars['ios_safari']
                });
            }
            if (angular.element.fn['ace_sidebar_hover']) {
                sidebar['ace_sidebar_hover']({
                    'sub_hover_delay': 750,
                    'sub_scroll_style': 'no-track scroll-thin scroll-margin scroll-visible'
                });
            }
        }

        function _collapseSidebar() {
            var sidebar = angular.element('.sidebar');
            sidebar['ace_sidebar']('collapse');
        }

        function _basics() {
            // for android and ios we don't use 'top:auto' when breadcrumbs is fixed
            if (ace.vars['non_auto_fixed']) {
                angular.element('body').addClass('mob-safari');
            }

            ace.vars['transition'] = !!angular.element.support.transition.end;

            angular.element('body').addClass('no-skin');
            angular.element('body').removeClass('login-layout');
        }

        function _enableDemoAjax() {
            if (!angular.element.fn['ace_ajax']) {
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

                    //for example in Ace HTML demo version we convert
                    ///ajax/index.html#page/gallery to > /ajax/content/gallery.html and load it
                    if (path.match(/(\/ajax\/)(index\.html)?/)) {
                        return path.replace(/(\/ajax\/)(index\.html)?/,
                            '/ajax/content/' +
                            hash.replace(/^page\//, '') + '.html');
                    }

                    //for example in Ace PHP demo version we
                    // convert 'ajax.php#page/dashboard' to 'ajax.php?page=dashboard' and load it
                    return path + '?' + hash.replace(/\//, '=');
                }
            };

            //for IE9 and below we exclude PACE loader (using conditional IE comments)
            //for other browsers we use the following extra ajax loader options
            if (window.Pace) {
                demoAjaxOptions['loading_overlay'] = 'body';//the opaque overlay is applied to 'body'
            }

            // initiate ajax loading on this element( which is
            // .page-content-area[data-ajax-content=true] in Ace's demo)
            angular.element('[data-ajax-content=true]')['ace_ajax'](demoAjaxOptions);

            //if general error happens and ajax is working, let's stop loading icon & PACE
            angular.element(window).on('error.ace_ajax', function () {
                angular.element('[data-ajax-content=true]').each(function () {
                    var that = angular.element(this);
                    if (that['ace_ajax']('working')) {
                        if (window.Pace && Pace.running) {
                            Pace.stop();
                        }

                        that['ace_ajax']('stopLoading', true);
                    }
                });
            });
        }

        function _sidebarTooltips() {
            //tooltip in sidebar items
            angular.element('.sidebar .nav-list .badge[title],.sidebar .nav-list .badge[title]')
                .each(function () {
                    var tooltipClass = angular.element(this).attr('class').match(/tooltip\-(?:\w+)/);
                    tooltipClass = tooltipClass ? tooltipClass[0] : 'tooltip-error';
                    angular.element(this).tooltip({
                        'placement': function (context, source) {
                            var offset = angular.element(source).offset();

                            if (parseInt(offset.left) < parseInt(document.body.scrollWidth / 2)) {
                                return 'right';
                            }
                            return 'left';
                        },
                        container: 'body',
                        template: '<div class=\'tooltip ' +
                        tooltipClass +
                        '\'><div class=\'tooltip-arrow\'>' +
                        '</div><div class=\'tooltip-inner\'></div></div>'
                    });
                });
            //or something like this if items are dynamically inserted
            /**
            angular.element('.sidebar').tooltip({
                'placement': function (context, source) {
                    var offset = angular.element(source).offset();
                    if( parseInt(offset.left) < parseInt(document.body.scrollWidth / 2) ) return 'right';
                    return 'left';
                },
                selector: '.nav-list .badge[title],.nav-list .label[title]',
                container: 'body',
                template: '<div class='tooltip tooltip-error'>' +
                '<div class='tooltip-arrow'></div><div class='tooltip-inner"></div></div>'
            });
            */
        }

        function _scrollTopBtn() {
            //the scroll to top button
            var scrollBtn = angular.element('.btn-scroll-up');
            if (scrollBtn.length > 0) {
                var isVisible = false;
                angular.element(window).on('scroll.scroll_btn', function () {
                    var scroll = ace.helper.scrollTop();
                    var h = ace.helper.winHeight();
                    var bodysH = document.body.scrollHeight;
                    //|| for smaller pages, when reached end of page
                    if (scroll > parseInt(h / 4) ||
                        (scroll > 0 && bodysH >= h && h + scroll >= bodysH - 1)) {
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
                }).triggerHandler('scroll.scroll_btn');

                scrollBtn.on(ace['click_event'], function () {
                    var duration = Math.min(500, Math.max(
                        100, parseInt(ace.helper.scrollTop() / 3)));
                    angular.element('html,body').animate({ scrollTop: 0 }, duration);
                    return false;
                });
            }
        }

        function _handleScrollbars() {
            //add scrollbars for navbar dropdowns
            var hasScroll = !!angular.element.fn['ace_scroll'];
            if (hasScroll) {
                angular.element('.dropdown-content')
                ['ace_scroll']({
                    reset: false,
                    mouseWheelLock: true
                });
            }

            //reset scrolls bars on window resize
            if (hasScroll && !ace.vars['old_ie']) {//IE has an issue with widget fullscreen on ajax?!!!
                angular.element(window).on('resize.reset_scroll', function () {
                    angular.element('.ace-scroll:not(.scroll-disabled)')
                        .not(':hidden')['ace_scroll']('reset');
                });

                if (hasScroll) {
                    angular.element(document).on('settings.ace.reset_scroll', function (e, name) {
                        if (name === 'sidebar_collapsed') {
                            angular.element('.ace-scroll:not(.scroll-disabled)')
                                .not(':hidden')
                            ['ace_scroll']('reset');
                        }
                    });
                }
            }
        }

        function _dropdownAutoPos() {
            //change a dropdown to "dropup" depending on its position
            angular.element(document).on('click.dropdown.pos',
                '.dropdown-toggle[data-position="auto"]',
                function () {
                    var offset = angular.element(this).offset();
                    var parent = angular.element(this.parentNode);

                    if (parseInt(offset.top + angular.element(this).height()) + 50 >
                        (ace.helper.scrollTop() +
                            ace.helper.winHeight() -
                            parent.find('.dropdown-menu').eq(0).height())
                    ) {
                        parent.addClass('dropup');
                    }
                    else {
                        parent.removeClass('dropup');
                    }
                });
        }

        function _navbarHelpers() {
            //prevent dropdowns from hiding when a from is clicked
            /**angular.element(document).on('click', '.dropdown-navbar form', function(e){
                e.stopPropagation();
            });*/

            //disable navbar icon animation upon click
            angular
                .element('.ace-nav [class*="icon-animated-"]')
                .closest('a')
                .one('click', function () {
                    var icon = angular.element(this).find('[class*="icon-animated-"]').eq(0);
                    var $match = icon.attr('class').match(/icon\-animated\-([\d\w]+)/);
                    icon.removeClass($match[0]);
                });

            //prevent dropdowns from hiding when a tab is selected
            angular.element(document).on('click', '.dropdown-navbar .nav-tabs', function (e) {
                e.stopPropagation();
                var $this, href;
                var that = e.target;
                if (($this = angular.element(e.target).closest('[data-toggle=tab]')) &&
                    $this.length > 0) {
                    $this.tab('show');
                    e.preventDefault();
                    angular.element(window).triggerHandler('resize.navbar.dropdown');
                }
            });
        }

        function _someBrowserFix() {
            //chrome and webkit have a problem here when resizing from 479px to more
            //we should force them redraw the navbar!
            if (ace.vars['webkit']) {
                var aceNav = angular.element('.ace-nav').get(0);
                if (aceNav) {
                    angular.element(window).on('resize.webkit_fix', function () {
                        ace.helper.redraw(aceNav);
                    });
                }
            }

            //fix an issue with ios safari, when an element is fixed and an input receives focus
            if (ace.vars['ios_safari']) {
                angular.element(document).on('ace.settings.ios_fix',
                    function (e, eventName, eventVal) {
                        if (eventName !== 'navbar_fixed') {
                            return;
                        }

                        angular
                            .element(document)
                            .off('focus.ios_fix blur.ios_fix', 'input,textarea,.wysiwyg-editor');

                        if (eventVal === true) {
                            angular.element(document).on(
                                'focus.ios_fix',
                                'input,textarea,.wysiwyg-editor',
                                function () {
                                    angular.element(window).on('scroll.ios_fix', function () {
                                        var navbar = angular.element('#navbar').get(0);
                                        if (navbar) {
                                            ace.helper.redraw(navbar);
                                        }
                                    });
                                }).on(
                                'blur.ios_fix',
                                'input,textarea,.wysiwyg-editor',
                                function () {
                                    angular.element(window).off('scroll.ios_fix');
                                });
                        }
                    }).triggerHandler('ace.settings.ios_fix',
                    [
                        'navbar_fixed',
                        angular.element('#navbar').css('position') === 'fixed']);
            }
        }

        function _bsCollapseToggle() {
            //bootstrap collapse component icon toggle
            angular.element(document).on('hide.bs.collapse show.bs.collapse',
                function (ev) {
                    var panelId = ev.target.getAttribute('id');
                    var panel = angular.element('a[href*="#' + panelId + '"]');

                    if (panel.length === 0) {
                        panel = angular.element('a[data-target*="#' + panelId + '"]');
                    }
                    if (panel.length === 0) {
                        return;
                    }

                    panel.find(ace.vars['.icon']).each(function () {
                        var $icon = angular.element(this);
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
        }

        function _smallDeviceDropdowns() {
            if (ace.vars['old_ie']) {
                return;
            }

            angular.element('.ace-nav > li')
                .on('shown.bs.dropdown.navbar', function (e) {
                    adjustNavbarDropdown.call(this);
                })
                .on('hidden.bs.dropdown.navbar', function (e) {
                    angular.element(window).off('resize.navbar.dropdown');
                    resetNavbarDropdown.call(this);
                });

            /*jshint maxcomplexity:16, maxstatements:46 */
            function adjustNavbarDropdown() {
                /*jshint validthis:true */
                var $sub = angular.element(this).find('> .dropdown-menu');

                if ($sub.css('position') === 'fixed') {
                    var winWidth = parseInt(angular.element(window).width());
                    var offsetW = winWidth > 320 ? 60 : (winWidth > 240 ? 40 : 30);
                    var availWidth = parseInt(winWidth) - offsetW;
                    var availHeight = parseInt(angular.element(window).height()) - 30;

                    var width = parseInt(Math.min(availWidth, 320));
                    //we set 'width' here for text wrappings and spacings to take effect before calculating scrollHeight
                    $sub.css('width', width);

                    var tabbed = false;
                    var extraParts = 0;
                    var dropdownContent =
                        $sub.find('.tab-pane.active .dropdown-content.ace-scroll');

                    if (dropdownContent.length === 0) {
                        dropdownContent = $sub.find('.dropdown-content.ace-scroll');
                    }
                    else {
                        tabbed = true;
                    }

                    var parentMenu = dropdownContent.closest('.dropdown-menu');
                    var scrollHeight = $sub[0].scrollHeight;
                    if (dropdownContent.length === 1) {
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
                    }

                    var height = parseInt(Math.min(availHeight, 480, scrollHeight + extraParts));
                    var left = parseInt(Math.abs((availWidth + offsetW - width) / 2));
                    var top = parseInt(Math.abs((availHeight + 30 - height) / 2));
                    var zindex = parseInt($sub.css('z-index')) || 0;

                    $sub.css({
                        'height': height,
                        'left': left,
                        'right': 'auto',
                        'top': top - (!tabbed ? 1 : 3)
                    });

                    if (dropdownContent.length === 1) {
                        if (!ace.vars['touch']) {
                            dropdownContent
                            ['ace_scroll']('update', { size: height - extraParts })
                            ['ace_scroll']('enable')
                            ['ace_scroll']('reset');
                        }
                        else {
                            dropdownContent
                            ['ace_scroll']('disable').css('max-height', height - extraParts)
                                .addClass('overflow-scroll');
                        }
                    }
                    //for bottom border adjustment and tab content paddings
                    $sub.css('height', height + (!tabbed ? 2 : 7));

                    if ($sub.hasClass('user-menu')) {
                        $sub.css('height', '');
                        //because of user-info hiding/showing at different widths,
                        //which changes above 'scrollHeight', so we remove it!

                        //user menu is re-positioned in small widths
                        //but we need to re-position again in small heights as well (modal mode)
                        var userInfo = angular.element(this).find('.user-info');
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
                    //so for example when in 'content-slider' page, fixed modal
                    //toggle buttons go above are dropdowns
                    //so we increase navbar's z-index to fix this!
                    angular.element(this)
                        .closest('.navbar.navbar-fixed-top')
                        .css('z-index', zindex);
                }
                else {
                    if ($sub.length !== 0) {
                        resetNavbarDropdown.call(this, $sub);
                    }
                }

                var self = this;
                angular.element(window)
                    .off('resize.navbar.dropdown')
                    .one('resize.navbar.dropdown', function () {
                        angular.element(self).triggerHandler('shown.bs.dropdown.navbar');
                    });
            }

            //reset scrollbars and user menu
            function resetNavbarDropdown(subMenuItem) {
                /*jshint validthis:true */
                subMenuItem = subMenuItem || angular.element(this).find('> .dropdown-menu');

                if (subMenuItem.length > 0) {
                    subMenuItem
                        .css({ 'width': '', 'height': '', 'left': '', 'right': '', 'top': '' })
                        .find('.dropdown-content').each(function () {
                            if (ace.vars['touch']) {
                                angular.element(this)
                                    .css('max-height', '')
                                    .removeClass('overflow-scroll');
                            }

                            var size = parseInt(angular.element(this).attr('data-size') || 0) ||
                                angular.element.fn['ace_scroll'].defaults.size;
                            angular.element(this)
                            ['ace_scroll']('update', { size: size })
                            ['ace_scroll']('enable')
                            ['ace_scroll']('reset');
                        });

                    if (subMenuItem.hasClass('user-menu')) {
                        var userInfo =
                            angular.element(this).find('.user-info')
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

                angular.element(this).closest('.navbar').css('z-index', '');
            }
        }

        function _authenticateBasics() {
            angular.element('body').removeClass('no-skin');
            angular.element('body').addClass('login-layout');
        }

        function _initToastr() {
            toastr.options = {
                'closeButton': false,
                'debug': false,
                'positionClass': 'toast-top-full-width',
                'onclick': null,
                'showDuration': '300',
                'hideDuration': '1000',
                'timeOut': '3500',
                'extendedTimeOut': '1000',
                'showEasing': 'swing',
                'hideEasing': 'linear',
                'showMethod': 'fadeIn',
                'hideMethod': 'fadeOut'
            };
        }

        function _initChosen() {
            if (!ace.vars['touch']) {
                angular.element('.chosen-select').chosen({ 'allow_single_deselect': true });
                //resize the chosen on window resize

                angular.element(window)
                    .off('resize.chosen')
                    .on('resize.chosen', function () {
                        angular.element('.chosen-select').each(function () {
                            var $this = angular.element(this);
                            $this.next().css({ 'width': $this.parent().width() });
                        });
                    }).trigger('resize.chosen');

                //resize chosen on sidebar collapse/expand
                angular.element(document).on('settings.ace.chosen',
                    function (e, eventName, eventVal) {
                        if (eventName !== 'sidebar_collapsed') {
                            return;
                        }
                        angular.element('.chosen-select').each(function () {
                            var $this = angular.element(this);
                            $this.next().css({ 'width': $this.parent().width() });
                        });
                    });

                angular.element('#chosen-multiple-style .btn').on('click',
                    function (e) {
                        var target = angular.element(this).find('input[type=radio]');
                        var which = parseInt(target.val());
                        if (which === 2) {
                            angular.element('#form-field-select-4').addClass('tag-input-style');
                        }
                        else {
                            angular.element('#form-field-select-4').removeClass('tag-input-style');
                        }
                    });
            }
        }
    }
})();
