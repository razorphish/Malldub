'use strict';

fundoloApp.factory('mdCoreDataSvc', ['$resource', '$q', '$window', 'seAuthSvc', 'appUrl',
  function ($resource, $q, $window, seAuthSvc, appUrl) {
  var p = {};
  p.defaultChargeFee = .029;
  p.defaultChargeAmount = .30;

  //#region === Resources ===

  var miracleResource = $resource(appUrl.api + '/api/miracle/:action/:id', { id: '@id', action: '@action' }, {
    'states':         { method: 'GET',  params: { action: 'states' },    isArray: true },
    'fundTypes':      { method: 'GET',  params: { action: 'fundtypes' }, isArray: true },
    'sendQuestion':   { method: 'POST', params: { action: 'sendquestion' }, isArray: true },
    'fundCategories': { method: 'GET',  params: { action: 'fundCategories'}, isArray:true}
  });

  var preRenderSource = $resource(appUrl.api + '/api/marasco/:action', {action: '@action'}, {
    'recache': { method: 'POST', params: { action: 'recache' } },
    'qrcode': { method: 'POST', params: { action: 'qrcode' } },
    'ipapi': { method: 'GET', params: {action: 'ipapi'} },
  });

  //#endregion === Resource ===
  
  //#region === Options data ===
  p.monthOptions = [
    { name: 'Jan', value: '1' },
    { name: 'Feb', value: '2' },
    { name: 'Mar', value: '3' },
    { name: 'Apr', value: '4' },
    { name: 'May', value: '5' },
    { name: 'Jun', value: '6' },
    { name: 'Jul', value: '7' },
    { name: 'Aug', value: '8' },
    { name: 'Sep', value: '9' },
    { name: 'Oct', value: '10' },
    { name: 'Nov', value: '11' },
    { name: 'Dec', value: '12' }
  ];

  p.yearOptions = function () {
    var years = [];
    var d = new Date();
    var currentYear = d.getFullYear();
    var rangeEndYear = d.getFullYear() + 15;
    for (var i = currentYear; i < rangeEndYear; i++) {
      years.push({        
        name: i,
        value: i
      });
    }
    return years;
  };
  
  p.payOptions = [
    {
      isDefault: false,
      levels: [{
        title: '0$ Miracles is cool but I just want to give to the fund',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 0
      }, {
        title: '0$ Miracles is cool but I just want to give to the fund',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 0
      }, {
        title: '0$ Miracles is cool but I just want to give to the fund',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 0
      }]
    },
    {
      isDefault: false,
      levels: [{
        title: '+$2 ({0}I just want to contribute something to Miracles)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 2.00
      }, {
        title: '+$5 ({0}I just want to contribute something to Miracles)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 5.00
      }, {
        title: '+$10 ({0}I just want to contribute something to Miracles)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 10.00
      }]
    },
    {
      isDefault: true,
      levels: [{
        title: '+$3 ({0}Because I wanna help everybody!  Most people choose this)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 3.00
      }, {
        title: '+$10 ({0}Miracles is doing something special. Most people choose this)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 10.00
      }, {
        title: '+$15 ({0}Miracles is doing something special. Most people choose this)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 15.00
      }]
    },
    {
      isDefault: false,
      levels: [{
        title: '+$10 ({0}Because Miracles is pretty awesome)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 10.00
      }, {
        title: '+$15 ({0}Because Miracles is pretty awesome)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 15.00
      }, {
        title: '+$20 ({0}Because Miracles is pretty awesome)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 20.00
      }]
    }, {
      isDefault: false,
      levels: [{
        title: '+$15  ({0}Because I Love, Love, Love Miracles)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 15.00
      }, {
        title: '+$20 ({0}I Love, Love, Love Miracles and how they\'re making a difference)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 20.00
      },
      {
        title: '+$25 ({0}I Love, Love, Love Miracles and how they\'re making a difference)',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 25.00
      }]
    }, {
      isDefault: false,
      levels: [{
        title: 'I have another amount in mind',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 0,
        customizableAmount: true
      }, {
        title: 'I have another amount in mind',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 0,
        customizableAmount: true
      }, {
        title: 'I have another amount in mind',
        percentage: 0,
        chargeFee: true,
        chargePercentage: p.defaultChargeFee,
        chargeAmount: p.defaultChargeAmount,
        amount: 0,
        customizableAmount: true
      }]
    }];
  //#endregion

  //#region === Misc ===
  p.getAllStates = function() {
    var deferred = $q.defer();

    miracleResource.states({},
      function(states) {
        deferred.resolve(states);
      }, function(response) {
        deferred.reject(response);
      });

    return deferred.promise;
  };

  p.getAllFundTypes = function () {
    var deferred = $q.defer();

    miracleResource.fundTypes({},
      function (fundTypes) {
        deferred.resolve(fundTypes);
      }, function (response) {
        deferred.reject(response);
      });

    return deferred.promise;
  };

  p.getAllFundCategories = function () {
    var deferred = $q.defer();

    miracleResource.fundCategories({},
      function (categories) {
        deferred.resolve(categories);
      }, function (response) {
        deferred.reject(response);
      });

    return deferred.promise;
  };

  p.reCache = function(url) {
    var deferred = $q.defer();

    preRenderSource.recache({
      url: appUrl.base + '/' + url
    }, function(res) {
      deferred.resolve(res);
    }, function(res) {
      deferred.reject(res);
    });

    return deferred.promise;
  };

  p.qrcode = function (url) {
    var deferred = $q.defer();

    preRenderSource.qrcode({
      value: appUrl.base + '/' + url,
      altTag: ''
    }, function (res) {
      deferred.resolve(res);
    }, function (res) {
      deferred.reject(res);
    });

    return deferred.promise;
  };

  p.isIe = function() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent;
      var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat(RegExp.$1);
    }
    else if (navigator.appName == 'Netscape') {
      var ua = navigator.userAgent;
      var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat(RegExp.$1);
    }
    return rv;
  }

    //#endregion

  //#region === Print methods ===

  p.printPage = function (printContents) {
    var styleContents = '<style>@page{margin-left: 0px;margin-right: 10px;margin-top: 0px;margin-bottom: 0px;}</style>';
    var popupWin = window.open('', '_blank', 'width=800,height=1010');
    popupWin.document.open();
    popupWin.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"><html><head>' + styleContents + '</head><body>' + printContents + '</html>');
    popupWin.print();
  }

  p.printSection = function (element, printContents, title) {

    element.printArea({
      mode: 'popup', //iframe
      removeMargins: true,
      popTitle: title,
      retainAttr:['id', 'ng-src', 'src']
    });

    return false;
  }
    //#endregion

  //#region === General Mail ===
  p.sendQuestion = function(questionModel) {
    var deferred = $q.defer();

    miracleResource.sendQuestion(questionModel,
      function(res) {
        deferred.resolve(res);
      },
      function() {
        deferred.reject({
          error: 'SendQuestion',
          error_description: 'Chipmunks have raided our email servers and we are attempting to quarantine.  Please try again!'
        });
      });

    return deferred.promise;
  }
  //#endregion

  //#region === Geo Methods ===

  p.getGeoData = function () {
    var deferred = $q.defer();

    $.getJSON("http://smart-ip.net/geoip-json?callback=?", function (data) {
      data.originalDevice = navigator.userAgent;
      deferred.resolve(data);
    }).fail(function () {
      deferred.reject({
        error: 'Error getting Geo from smart-ip',
        error_description: 'Unable to get data from smart-ip'
      });
    });

    return deferred.promise;
  }

  p.getGeoData2 = function () {
    var deferred = $q.defer();

    preRenderSource.ipapi({}, function (data) {
      data.host           = data.query;
      data.originalDevice = navigator.userAgent;
      data.latitude       = data.lat;
      data.longitude      = data.lon;
      data.ipAddress      = data.host;
      data.alias          = data.as;
      data.organization   = data.org;
      deferred.resolve(data);
    }, function (res) {
      deferred.reject(res);
    });

    return deferred.promise;
  };


  p.getGeoData4 = function () {
    var deferred = $q.defer();

    $.getJSON("http://ip-api.com/json", function (data) {
      data.host           = data.query;
      data.originalDevice = navigator.userAgent;
      data.latitude       = data.lat;
      data.longitude      = data.lon;
      data.ipAddress      = data.host;
      data.alias          = data.as;
      data.organization   = data.org;
      deferred.resolve(data);
    }).fail(function () {
      deferred.reject({
        error: 'Error getting Geo from ip-api',
        error_description: 'Unable to get data from ip-api'
      });
    });

    return deferred.promise;
  }

  p.getGeoData3 = function (address) {
    //Google based
    var deferred = $q.defer();
    var dataAddress = encodeURIComponent(address);
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + dataAddress, function (data) {
      if (data.status !== 'OK') {
        deferred.reject({
          error: 'Error retrieving records',
          error_description: 'No records were returned from call'
        });
        return;
      }

      switch(data.results.length) {
        case 0:
          deferred.reject({
            error: 'No records returned',
            error_description: 'No records were returned from call',
            error_message: 'The address provided was incomplete or invalid.  Please check and try again.'
          });
          break;
        case 1:
          if (data.results[0].types.length !== 1 || data.results[0].types.indexOf('street_address') === -1) {
            deferred.reject({
              error: 'Invalid data returned',
              error_description: 'No records were returned from call',
              error_stack: data,
              error_message: 'The address provided returned mixed results.  Please check and try again.'
            });
            return;
          }
          var geo = {
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng,
            formattedAddress: data.results[0].formatted_address
          }
          angular.forEach(data.results[0].address_components, function (value, key) {
            if (value.types.indexOf('neighborhood') === 0) {
              geo.neighborhood = value.long_name;
            }
            if (value.types.indexOf('locality') === 0) {
              geo.city = value.long_name;
            }
            if (value.types.indexOf('administrative_area_level_2') === 0) {
              geo.county = value.long_name;
            }
            if (value.types.indexOf('administrative_area_level_1') === 0) {
              geo.state = value.long_name;
              geo.stateCode = value.short_name;
            }
            if (value.types.indexOf('country') === 0) {
              geo.country = value.long_name;
              geo.countryCode = value.short_name;
            }
            if (value.types.indexOf('postal_code') === 0) {
              geo.zip = value.long_name;
            }
            if (value.types.indexOf('postal_code_suffix') === 0) {
              geo.zipSuffix = value.long_name;
            }
          });
          deferred.resolve(geo);
          break;
        default:
          deferred.reject({
            error: 'More than 1 record was returned',
            error_description: 'The query matched more than one item',
            error_message: 'The address provided some mixed results.  Please check and try again.'
          });
          break;
      }

    }).fail(function () {
      deferred.reject({
        error: 'Error getting Geo from google Api',
        error_description: 'Unable to get data from google',
        error_message: 'Please refresh the page and try again'
      });
    });

    return deferred.promise;
  }
  //#endregion

  return p;
}])