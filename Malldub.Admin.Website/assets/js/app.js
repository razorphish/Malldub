
var App = function () {
  var that = {};

  function handleIEFixes() {
    //fix html5 placeholder attribute for ie7 & ie8
    var ie7 = (navigator.userAgent.match(/msie [7]/i));
    var ie8 = (navigator.userAgent.match(/msie [8]/i));
    if (ie7 || ie8) { // ie7&ie8
      jQuery('input[placeholder], textarea[placeholder]').each(function () {
        var input = jQuery(this);

        jQuery(input).val(input.attr('placeholder'));

        jQuery(input).focus(function () {
          if (input.val() == input.attr('placeholder')) {
            input.val('');
          }
        });

        jQuery(input).blur(function () {
          if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.val(input.attr('placeholder'));
          }
        });
      });
    }
  }

  that.init = function () {
    handleIEFixes();
  }


  that.initToastr = function () {
      toastr.options = {
        "closeButton": false,
        "debug": false,
        "positionClass": "toast-top-full-width",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
  };

  return that;
}();