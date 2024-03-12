'use strict';

malldubAdminApp.factory('seAuthSvc', function ($http, $cookieStore, $resource, $q, $log, BASE_API_URL, BASE_URL) {
  
  //#region === Variables ===

  var p = {};
  var mockToken = {
    access_token: 'bearer ',
    expires_in: '',
    token_type: '',
    userName: ''
  };
  var ghostToken;
  var accessLevels = routingConfig.accessLevels;
  var userRoles    = routingConfig.userRoles;
  var currentUser  = parseUser() || {
    userName: '',
    role: userRoles.public,
    isAuthenticated: false
  };

  //#endregion === Variables ===
  
  //#region === Utility Functions ===
  //TODO Add this method to a utilities function global::
  function queryStringToJSON(queryString) {
    //if first character is '?'
    //var pairs = querystring.slice(1).split('&');
    var pairs = queryString.split('&');

    var result = {};
    pairs.forEach(function (pair) {
      pair = pair.split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
  }
  
  var parseError = function (response) {
    if (angular.isUndefined(response.data)) {
      return null;
    }

    if (angular.isUndefined(response.data.modelState) === false) {
      return parseModelObject(response);
    }

    return "";
  };
  
  function parseUser() {
    var cookie = (sessionStorage['user'] || localStorage['user']);
    if (angular.isUndefined(cookie)) {
      return null;
    }

    return JSON.parse(cookie);
  };

  function stringifyUser(user) {
    return JSON.stringify(user);
  }

  function changeUser(user) {
    angular.extend(currentUser, user);
  };

  var clearUser = function () {
    changeUser({
      userName: '',
      role: userRoles.public,
      token: mockToken
    });
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  };

  var getInternalToken = function () {
    var token = p.user.token || ghostToken;
    if (angular.isUndefined(token)) {
      return '';
    }
    return token.token_type + ' ' + token.access_token;
  };
  
  var parseModelObject = function(response) {

    var model = response.data;
    var errorObject = {
      error : model.message,
      error_description: ''
    };
    if (!angular.isUndefined(model.modelState[""])) {
      errorObject.error_description += ' ' + model.modelState[""];
    }
    
    if (!angular.isUndefined(model.modelState["model.ConfirmEmail"])) {
      errorObject.error_description = model.modelState["model.ConfirmEmail"];
    }
    
    if (!angular.isUndefined(model.modelState["model.UserName"])) {
      errorObject.error_description += ' ' + model.modelState["model.UserName"];
    }
    
    if (!angular.isUndefined(model.modelState["model.ConfirmPassword"])) {
      errorObject.error_description += ' ' + model.modelState["model.ConfirmPassword"];
    }
    
    if (!angular.isUndefined(model.modelState["model.Password"])) {
      errorObject.error_description += ' ' + model.modelState["model.Password"];
    }

    if (!angular.isUndefined(model.modelState["model.Email"])) {
      errorObject.error_description += ' ' + model.modelState["model.Email"];
    }
    
    if (!angular.isUndefined(model.modelState["model.FirstName"])) {
      errorObject.error_description += ' ' + model.modelState["model.FirstName"];
    }
    
    if (!angular.isUndefined(model.modelState["model.LastName"])) {
      errorObject.error_description += ' ' + model.modelState["model.LastName"];
    }
    
    if (!angular.isUndefined(model.modelState["model.StatusId"])) {
      errorObject.error_description += ' ' + model.modelState["model.StatusId"];
    }
    return errorObject;
  };
  //#endregion
  
  //#region === Resources ===
  
  var resource = $resource(BASE_API_URL + '/api/auth/:action', {
    action: '@action'
  }, {
    'register':          { method: 'POST', params: { action: 'register' } },
    'registerAnonymous': { method: 'POST', params: { action: 'registerAnonymous' } },
    'externalLogin':     { method: 'POST', params: { action: 'externalLogin' } },
    'externalLogins':    { method: 'GET',  params: { action: 'externalLogins' }, isArray: true },
    'manageInfo':        { method: 'GET',  params: { action: 'manageInfo' }, headers: { 'authorization': getInternalToken } },
    'addExternalLogin':  { method: 'POST', params: { action: 'addExternalLogin' }, headers: { 'authorization': getInternalToken } },
    'changePassword':    { method: 'POST', params: { action: 'changePassword' }, headers: { 'authorization': getInternalToken } },
    'logout':            { method: 'POST', params: { action: 'logout' }, headers: { 'authorization': getInternalToken } },
    'registerExternal':  { method: 'POST', params: { action: 'registerExternal' }, headers: { 'authorization': getInternalToken } },
    'removeLogin':       { method: 'POST', params: { action: 'removeLogin' } },
    'setPassword':       { method: 'POST', params: { action: 'setPassword' }, headers: { 'authorization': getInternalToken } },
    'userInfo':          { method: 'GET',  params: { action: 'userInfo' }, headers: { 'authorization': getInternalToken } },
    'resetPassword':     { method: 'POST', params: { action: 'resetPassword' }},
  });

  var tokenResource = $resource(BASE_API_URL + '/token', {}, {
    'token': { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
  });

  //#endregion === Resources ===

  //#region === Methods ===
  p.addExternalLogin = function () {
    var deferred = $q.defer();
    var model = ghostToken;
    if (angular.isUndefined(model)) {
      deferred.reject({
        error: 'Add external login',
        error_description: 'The access token is missing or invalid'
      });
    } else {
      resource.addExternalLogin({
        externalAccessToken: model.access_token
    },
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject({
            error: 'Add external login',
            error_description: 'Unable to add external login.',
            data: response
          });
        });
    }

    return deferred.promise;
  };
  
  p.handleAccessTokenRedirect = function (provider, querystring) {
    var deferred = $q.defer();
    var fragment = queryStringToJSON(querystring);

    if (angular.isDefined(fragment.error)) {
      deferred.reject(fragment);
    } else {
      ghostToken = fragment;
      deferred.resolve(fragment);
    }

    return deferred.promise;
  };

  p.getBearerToken = function () {
    return getInternalToken();
  };

  p.removeLogin = function(login) {
    var deferred = $q.defer();

    if (angular.isUndefined(login.loginProvider) || angular.isUndefined(login.providerKey)) {
      deferred.reject({
        error: 'Remove login provider',
        error_description: 'Login provider and/or provider key are missing or invalid.'
      });
    } else {
      resource.removeLogin(login,
        function(response) {
          deferred.resolve(response);
        }, 
        function(response) {
          deferred.reject({
            error: 'Remove login provider',
            error_description: 'There was an error removing login provider',
            obj: response
          });
      });
    }

    return deferred.promise;
  };

  p.externalLogins = function(returnUrl, generateState) {
    var deferred = $q.defer();

    if (angular.isUndefined(returnUrl)) {
      returnUrl = BASE_URL + '/';
    }
    
    if (angular.isUndefined(generateState)) {
      generateState = true;
    }

    resource.externalLogins({
      returnUrl: returnUrl,
      generateState: generateState
    },
      function(ets) {
        deferred.resolve(ets);
      },
      function(response) {
        deferred.reject({          
          error: 'ExternalLogin',
          error_description: 'Unable to retrieve external logins.  Please try again.',
          obj: response
        });
      });

    return deferred.promise;
  };
  
  p.login = function(user, persistent) {
    var deferred = $q.defer();

    if (angular.isUndefined(user.userName) || angular.isUndefined(user.password)) {
      deferred.reject({
        error: 'Username/Password',
        error_description: 'Invalid or missing username and/or password.'
      });
    } else {

      var params = $.param({
        username:   user.userName,
        password:   user.password,
        grant_type: 'password'
      });

      tokenResource.save(params,
        function (authToken) {
          setUser(user, authToken, persistent);
          //simple 200 will suffice
          deferred.resolve(authToken);
        },
        function(response) {
          deferred.reject({
            error: 'Login',
            error_description: 'Unable to login into system. Please try again'
          });
          $log.warn(response);
        }
      );
      
    }
    return deferred.promise;
  };

  var setUser = function(user, token, persistent) {
    user.token      = token;
    user.role       = userRoles.user;
    user.password   = '';
    user.persistent = persistent;
    // Call here to set token for next call :GetUserInfo
    changeUser(user);

    p.getUserInfo().then(function(promisedUser) {
      user.firstName             = promisedUser.firstName;
      user.lastName              = promisedUser.lastName;
      user.email                 = promisedUser.email;
      user.hasRegistered         = promisedUser.hasRegistered;
      user.hasRegisteredExternal = promisedUser.hasRegisteredExteranal;
      user.isAuthenticated = promisedUser.isAuthenticated;
      changeUser(user);
      setUserCookie(user, persistent);
    }, function(response) {
      //TODO Thro angular exception
    });
  };

  var setUserCookie = function(user, persistent) {
    if (persistent) {
      localStorage['user'] = stringifyUser(user);
    } else {
      sessionStorage['user'] = stringifyUser(user);
    }
  };

  p.getUserInfo = function () {

    var deferred = $q.defer();
    resource.userInfo({}, function(userInfo) {
      deferred.resolve(userInfo);
    }, function (response) {
      deferred.reject(response);
    });

    return deferred.promise;
  };

  p.authorize = function(accessLevel, role) {
    if (role === undefined)
      role = currentUser.role;

    return accessLevel.bitMask & role.bitMask;
  };
  
  p.isLoggedIn = function(user) {
    if (user === undefined || user === null)
      user = currentUser;
    return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
  };
  
  p.register = function(user) {

    var deferred = $q.defer();

    if (angular.isUndefined(user)) {
      deferred.reject({
        error: 'Username object',
        error_description: 'Invalid or missing user.'
      });
    } else {
      resource.register(user,
        function (response, status, headers, confi) {
          deferred.resolve(response);
        },
        function (response, status, headers, confi) {
          deferred.reject(parseError(response));
        });
    }
    return deferred.promise;
  };
  
  p.registerAnonymous = function (user) {

    var deferred = $q.defer();

    if (angular.isUndefined(user)) {
      deferred.reject({
        error: 'Username object',
        error_description: 'Invalid or missing user.'
      });
    } else {
      resource.registerAnonymous(user,
        function (response, status, headers, confi) {
          deferred.resolve(response);
        },
        function (response, status, headers, confi) {
          deferred.reject(parseError(response));
        });
    }
    return deferred.promise;
  };

  p.registerExternal = function (user) {

    var deferred = $q.defer();

    if (angular.isUndefined(user)) {
      deferred.reject({
        error: 'Username object',
        error_description: 'Invalid or missing user.'
      });
    } else {
      resource.registerExternal(user,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(parseError(response));
        });
    }
    return deferred.promise;
  };

  p.manageInfo = function (returnUrl, generateState) {
    var deferred = $q.defer();

    if (angular.isUndefined(returnUrl)) {
      returnUrl = BASE_URL + '/';
    }

    if (angular.isUndefined(generateState)) {
      generateState = true;
    }

    resource.manageInfo({
      returnUrl: returnUrl,
      generateState: generateState
    },
      function (response) {
        deferred.resolve(response);
      },
      function (response) {
        deferred.reject({
          error: 'Manage Info',
          error_description: 'Unable to retrieve manage info.  Please try again.',
          obj: response
        });
      });

    return deferred.promise;
  };

  p.setUserExternal = function (user, token) {
    var myToken     = token || ghostToken;
    user.token      = myToken;
    user.role       = userRoles.user;
    user.password   = '';
    user.isExternal = true;
    ghostToken      = null;
    changeUser(user);
    setUserCookie(user, false);
  };

  p.extendUser = function (user) {
    var persistent = user.persistent || false;
    changeUser(user);
    setUserCookie(user, persistent);
  };

  p.setPassword = function(password) {
    var deferred = $q.defer();

    if (angular.isUndefined(password) || angular.isUndefined(password.confirmPassword)) {
      deferred.reject({
        error: 'Password object',
        error_description: 'Invalid or missing password.'
      });
    } else {
      resource.setPassword(password,
        function(response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });
    }

    return deferred.promise;
  };

  p.resetPassword = function(resetPasswordModel) {
    var deferred = $q.defer();

    if (angular.isUndefined(resetPasswordModel)) {
      deferred.reject({
        error: 'Reset password username invalid',
        error_description: 'Invalid or missing username.'
      });
    } else {
      resource.resetPassword(resetPasswordModel,
        function(response) {
          deferred.resolve(response);
        }, function(response) {
        deferred.reject(response);
      });
    }

    return deferred.promise;
  };

  p.changePassword = function(password) {
    var deferred = $q.defer();

    if (angular.isUndefined(password)) {
      deferred.reject({
        error: 'Password object',
        error_description: 'Invalid or missing password.'
      });
    } else {
      resource.changePassword(password,
        function(response) {
          deferred.resolve(response);
        },
        function (response) {
          if (angular.isUndefined(response.data.modelState) === false) {
            deferred.reject(parseModelObject(response));
          }
          deferred.reject({
            error: 'Password object',
            error_description: 'Invalid or missing password.'
          });
        });
    }

    return deferred.promise;
  };

  p.logout = function () {
    var deferred = $q.defer();
    
    resource.logout({},
      function(response) {
        clearUser();       
        deferred.resolve(response);
      },
      function (response) {
        deferred.reject(response);
      });

    return deferred.promise;
  };
  //#endregion === Methods ===
  
  p.accessLevels = accessLevels;
  p.userRoles    = userRoles;
  p.user         = currentUser;

  return p;
});

malldubAdminApp.factory('Users', function ($http) {
  return {
    getAll: function (success, error) {
      $http.get('/users').success(success).error(error);
    }
  };
});
