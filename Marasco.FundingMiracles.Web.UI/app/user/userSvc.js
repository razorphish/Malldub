'use strict';

fundoloApp.factory('userSvc', ['$resource', '$q', 'appUrl', 'seAuthSvc',
  function ($resource, $q, appUrl, seAuthSvc) {
  var p = {};
  var resource = $resource(appUrl.api + '/api/userdetails/:action', {}, {
    'get':           { method: 'GET', headers: { 'authorization': seAuthSvc.getBearerToken }},
    'update':        { method: 'PUT', params: { action: 'update' }, headers: { 'authorization': seAuthSvc.getBearerToken } },
    'updateBasics':  { method: 'PUT', params: { action: 'updateBasics' }, headers: { 'authorization': seAuthSvc.getBearerToken } },
    'updateStatus':  { method: 'PUT', params: { action: 'updatestatus' }, headers: { 'authorization': seAuthSvc.getBearerToken } },
    'donations':     { method: 'GET', params: { action: 'donations' }, headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true },
    'getByUserName': { method: 'GET' },
  });


  p.user = seAuthSvc.user;

  p.get = function () {
    var deferred = $q.defer();
      
    resource.get({},
      function (user) {
        deferred.resolve(user);
      },
      function(response) {
        deferred.reject(response);
      });

    return deferred.promise;
  };


  p.getByUserName = function (userName) {
    var deferred = $q.defer();

    if (angular.isUndefined(userName) || userName < 1) {
      deferred.reject(mockUser);
    } else {
      resource.getByUserName({ userName: userName },
        function (user) {
          deferred.resolve(user);
        },
        function (response) {
          deferred.reject(response);
        });
    }

    return deferred.promise;
  };
  
  p.save = function(user) {
    var deferred = $q.defer();

    if (angular.isUndefined(user)) {
      deferred.reject();
    } else {

      if (angular.isUndefined(user.identification) || user.identification.length < 1) {
        if (angular.isUndefined(user.userEmailList)) {
          user.userEmailList = [ {email: {identification : user.name}}];
        } else {
          user.userEmailList[0].email.identification = user.name;
        }
        p.create(user).then(function (promisedUser) {
          deferred.resolve(promisedUser);
        }, function (response) {
          deferred.reject(response);
        });
      } else {
        p.update(user).then(function (promisedUser) {
          deferred.resolve(promisedUser);
        }, function (response) {
          deferred.reject(response);
        });
      }
    }

    return deferred.promise;
  };

  p.create = function(user) {
    var deferred = $q.defer();

    if (angular.isUndefined(user)) {
      deferred.reject();
    } else {
      resource.save(user,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });
    }

    return deferred.promise;
  };

  p.update = function(user) {
    var deferred = $q.defer();

    if (angular.isUndefined(user) || user.identification < 1) {
      deferred.reject();
    } else {
      resource.update(user,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });
    }

    return deferred.promise;
  };

  p.updateBasics = function (user) {
    var deferred = $q.defer();

    if (angular.isUndefined(user) || user.identification < 1) {
      deferred.reject({
        error: 'User',
        error_description: 'Oops this user was either launched into space or abducted by aliens.'
      });
    } else {
      resource.updateBasics(user,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });
    }

    return deferred.promise;
  };

  p.updateStatus = function (status) {
    var deferred = $q.defer();

    if (angular.isUndefined(status)) {
      deferred.reject();
    } else {
      resource.updateStatus({
          status : status
        },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });
    }

    return deferred.promise;
  };

  p.getDonations = function() {
    var deferred = $q.defer();

    resource.donations({},
      function(response) {
        deferred.resolve(response);
      },
      function(response) {
        deferred.reject(response);
      });

    return deferred.promise;
  };

  var mockUser = {
    name: '',
    firstName: '',
    lastName: '',
    keepUpdated: false,
    statusId: 'Pending',
    itemList: null,
    userAddressList: [{
      isDefault: true,
      address: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        longitude: 0,
        latitude: 0,
        county: '',
        country: ''
      }
    }],
    userPhoneList: [{
      isDefault: true,
      phone : {
        typeId: 'Mobile',
        number: ''
      }
    }],
    userEmailList: [{
      isDefault: true,
      email: {
        identification: ''
      }
    }],
    bidList: null
  };
  
  return p;
}]);