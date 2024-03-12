fundoloApp.factory('seAuthSvc', ['$http', '$cookieStore', '$resource', '$q', '$log', '$interval', '$window', 'appUrl',
  function ($http, $cookieStore, $resource, $q, $log, $interval, $window, appUrl) {
  
  //#region === Variables ===
    'use strict';
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
    var currentUser = parseUser() || {
      userName: '',
      role: userRoles.public,
      isAuthenticated: false
    };

  //#endregion === Variables ===
  
  //#region === Utility Functions ===
  //TODO Add this method to a utilities function global::
    function queryStringToJson(queryString) {
      //if first character is '?'
      //var pairs = querystring.slice(1).split('&');
      var pairs = queryString.split('&');

      var result = {};
      pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
      });

      return JSON.parse(JSON.stringify(result));
    }

    var parseError = function (response) {
      if (angular.isUndefined(response.data)) {
        return null;
      }

      if (angular.isDefined(response.data.modelState)) {
        return parseModelObject(response);
      } else {
        return response;
      }
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

    function getInternalToken() {
      var token = p.user.token || ghostToken;
      if (angular.isUndefined(token)) {
        return '';
      }
      return token.token_type + ' ' + token.access_token;
    };

    var parseModelObject = function(response) {

      var model = response.data;
      var errorObject = {
        error: model.message,
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
  
    var resource = $resource(appUrl.api + '/api/auth/:action', {
      action: '@action'
    }, {
      'register':           { method: 'POST', params: { action: 'register' } },
      'registerAnonymous':  { method: 'POST', params: { action: 'registerAnonymous' } },
      'externalLogin':      { method: 'POST', params: { action: 'externalLogin' } },
      'externalLogins':     { method: 'GET',  params: { action: 'externalLogins' }, isArray: true },
      'singleExternalLogin':{ method: 'GET',  params: { action: 'singleExternalLogin' }, isArray: true },
      'manageInfo':         { method: 'GET',  params: { action: 'manageInfo' }, headers: { 'authorization': getInternalToken } },
      'addExternalLogin':   { method: 'POST', params: { action: 'addExternalLogin' }, headers: { 'authorization': getInternalToken } },
      'changePassword':     { method: 'POST', params: { action: 'changePassword' }, headers: { 'authorization': getInternalToken } },
      'logout':             { method: 'POST', params: { action: 'logout' }, headers: { 'authorization': getInternalToken } },
      'registerExternal':   { method: 'POST', params: { action: 'registerExternal' }, headers: { 'authorization': getInternalToken } },
      'removeLogin':        { method: 'POST', params: { action: 'removeLogin' } },
      'setPassword':        { method: 'POST', params: { action: 'setPassword' }, headers: { 'authorization': getInternalToken } },
      'userInfo':           { method: 'GET',  params: { action: 'userInfo' }, headers: { 'authorization': getInternalToken } },
      'postClaim':          { method: 'POST', params: { action: 'claim' }, headers: { 'authorization': getInternalToken } },
      'resetPassword':      { method: 'POST', params: { action: 'resetPassword' }},
    });

    var tokenResource = $resource(appUrl.api + '/token', {}, {
      'token': { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
    });

  //#endregion === Resources ===

  //#region === Methods ===
    p.addExternalLogin = function (myToken) {
      var deferred = $q.defer();
      var model = ghostToken || myToken;
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
      var fragment = queryStringToJson(querystring);

      if (angular.isDefined(fragment.error)) {
        deferred.reject(fragment);
      } else {
        ghostToken = fragment;
        deferred.resolve(fragment);
      }

      return deferred.promise;
    };

    p.getBearerToken = getInternalToken;

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
        returnUrl = appUrl.base + '/';
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

    p.singleExternalLogin = function (provider, returnUrl, generateState) {
      var deferred = $q.defer();

      if (angular.isUndefined(returnUrl)) {
        returnUrl = appUrl.base + '/';
      }

      if (angular.isUndefined(generateState)) {
        generateState = true;
      }

      if (angular.isUndefined(provider)) {
        deferred.reject({
          error: 'Provider',
          error_description: 'Invalid or missing provider.'
        });
      } else {

        resource.singleExternalLogin({
            provider: provider,
            returnUrl: returnUrl,
            generateState: generateState
          },
          function(ets) {
            deferred.resolve(ets);
          },
          function(response) {
            deferred.reject({
              error: 'SingleExternalLogin',
              error_description: 'Unable to retrieve external login [' + provider + ']  Please try again.',
              obj: response
            });
          });
      }
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
            p.setUser(user, authToken, persistent);
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

    var setUserCookie = function(user, persistent) {
      if (persistent) {
        localStorage['user'] = stringifyUser(user);
      } else {
        sessionStorage['user'] = stringifyUser(user);
      }
    };

    p.setUser = function (user, token, persistent) {
      user.token      = token;
      user.role       = userRoles.user;
      user.password   = '';
      user.persistent = persistent;
      // Call here to set token for next call :GetUserInfo
      changeUser(user);

      p.getUserInfo().then(function (promisedUser) {
        user.firstName             = promisedUser.firstName;
        user.lastName              = promisedUser.lastName;
        user.email                 = promisedUser.email;
        user.hasRegistered         = promisedUser.hasRegistered;
        user.hasRegisteredExternal = promisedUser.hasRegisteredExternal;
        user.isAuthenticated       = promisedUser.isAuthenticated;
        user.facebookProvider      = promisedUser.facebookProvider;
        user.identification        = promisedUser.identification;
        changeUser(user);
        setUserCookie(user, persistent);
      }, function (response) {
        //TODO Thro angular exception
      });
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
        var externalResource = $resource(appUrl.api + '/api/auth/:action', {
          action: '@action'
        }, {
          'registerExternal': { method: 'POST', params: { action: 'registerExternal' }, headers: { 'authorization': getInternalToken } },
        });
        externalResource.registerExternal(user,
          function (response) {
            deferred.resolve(response);
          },
          function (response, xhr) {
            deferred.reject(parseError(response));
          });
      }
      return deferred.promise;
    };

    p.manageInfo = function (returnUrl, generateState) {
      var deferred = $q.defer();

      if (angular.isUndefined(returnUrl)) {
        returnUrl = appUrl.base + '/';
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

    p.setUserExternal = function (user, token, provider) {
      var myToken           = token || ghostToken;
      user.token            = myToken;
      user.role             = userRoles.user;
      user.password         = '';
      user.isExternal       = true;
      user.externalProvider = provider;
      ghostToken            = null;
      changeUser(user);
      setUserCookie(user, true);
    };

    p.setUserExternalToken = function(token) {
      ghostToken = token;
    }

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

    p.postClaim = function(claimType, val) {
      var deferred = $q.defer();

      if (angular.isUndefined(claimType) || angular.isUndefined(val)) {
        deferred.reject({
          error: 'Invalid params',
          error_description: 'Claim type or Val is either missing or invalid'
        });
      } else {
        resource.postClaim({claimType: claimType, val: val}, 
         function(response) {
          deferred.resolve(response);
        }, function(response) {
          deferred.reject(response);
        });
      }

      return deferred.promise;
    }

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
          clearUser();
        });

      return deferred.promise;
    };
    //#endregion === Methods ===
  
    //#region === Facebook Methods ====
    p.facebookLogin = function (user, facebookUrl) {
      var deferred = $q.defer();

      $window.$davidScope = {};
      var obj = {};



        var left     = screen.width / 2 - 200;
        var top      = screen.height / 2 - 250;
        var popup = $window.open(appUrl.facebook.signInUrl + facebookUrl, '', "top=" + top + ",left=" + left +
          ",width=650,height=400,toolbar=0,menubar=0,location=1,status=1,scrollbars=1,resizable=1,left=0,top=0");
        var interval = 1000;

        // create an ever increasing interval to check a certain global value getting assigned in the popup
        var i = $interval(function() {
          interval += 250;
          try {

            if (popup.value) {
              angular.extend(user, $davidScope.user);
              obj.user = user;
              if ($davidScope.connect) {
                obj.isExternalLogin = true;
                deferred.resolve(obj);
              } else if ($davidScope.register) {
                obj.isExternalRegister = true;
                obj.user.confirmEmail  = user.email;
                obj.user.token         = $davidScope.says.access_token;
                obj.user.password      = 'fundingmiracles';
                obj.user.disableWePay  = true;
                obj.user.userName      = user.email;
                obj.token = {
                  access_token: $davidScope.says.access_token,
                  expires_in: $davidScope.says.expires_in,
                  state: $davidScope.says.state,
                  token_type: $davidScope.says.token_type
                };
                p.setUserExternalToken(obj.token);
                p.registerExternal(obj.user).then(function () {
                  p.login(obj.user).then(function(response) {
                    deferred.resolve(obj);
                  },
                  function(response) {
                    toastr.error('Error authenticating the external user.  Please refresh and try again');
                    deferred.reject(obj);
                  });
                }, function(response) {
                  deferred.reject(response);
                });
              } else {
                obj.token = {
                  access_token: $davidScope.says.access_token,
                  expires_in: $davidScope.says.expires_in,
                  state: $davidScope.says.state,
                  token_type: $davidScope.says.token_type
                };
                obj.user.token = obj.token;
                p.setUser(obj.user, obj.token, true);
                deferred.resolve(obj);
              }
              $interval.cancel(i);
              popup.close();
            }
          } catch (e) {
            deferred.reject(e);
          }
        }, interval);

      return deferred.promise;
    }
      //#endregion

    p.accessLevels = accessLevels;
    p.userRoles    = userRoles;
    p.user         = currentUser;

    return p;
}]);

fundoloApp.factory('Users', ['$http', function ($http) {
  return {
    getAll: function (success, error) {
      $http.get('/users').success(success).error(error);
    }
  };
}]);
