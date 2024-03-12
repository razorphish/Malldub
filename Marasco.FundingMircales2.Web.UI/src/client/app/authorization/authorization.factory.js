(function () {
    'use strict';

    angular
        .module('ep.authorization')
        .factory('seAuthFactory', authorizationFactory);

    authorizationFactory.$inject = [
        '$http', '$resource', '$q', '$log', 'routingConfig',
        'localStorageService', 'epAxisSettingsVal', 'inspiniaConstant'];

    function authorizationFactory(
        $http, $resource, $q, $log, routingConfig,
        localStorageService, epAxisSettingsVal, inspiniaConstant) {

        var factory = {};

        var _accessLevels = routingConfig.accessLevels;

        var _userRoles = routingConfig.userRoles;

        var _authentication = {
            isAuth: false,
            userName: '',
            useRefreshTokens: false,
            roles: [_userRoles.public]
        };

        var resource = $resource(epAxisSettingsVal.inspiniaApiUrl + '/api/account/:action', {
            action: '@action'
        }, {
                'register': { method: 'POST', params: { action: 'register' } },
                'registerAnonymous': { method: 'POST', params: { action: 'registerAnonymous' } },
                'externalLogin': { method: 'POST', params: { action: 'externalLogin' } },
                'externalLogins': {
                    method: 'GET',
                    params: {
                        action: 'externalLogins'
                    },
                    isArray: true
                },
                'singleExternalLogin': {
                    method: 'GET',
                    params: {
                        action: 'singleExternalLogin'
                    },
                    isArray: true
                },
                'manageInfo': { method: 'GET', params: { action: 'manageInfo' } },
                'addExternalLogin': { method: 'POST', params: { action: 'addExternalLogin' } },
                'changePassword': { method: 'POST', params: { action: 'changePassword' } },
                'logout': { method: 'POST', params: { action: 'logout' } },
                'registerExternal': { method: 'POST', params: { action: 'registerExternal' } },
                'removeLogin': { method: 'POST', params: { action: 'removeLogin' } },
                'setPassword': { method: 'POST', params: { action: 'setPassword' } },
                'userInfo': { method: 'GET', params: { action: 'userInfo' } },
                'resetPassword': { method: 'POST', params: { action: 'resetPassword' } },
                'UpdateUserById': { method: 'POST', params: { action: 'UpdateUserById' } },
                'forgotPassword': { method: 'POST', params: { action: 'SendEmail' } },
                'GetUserDetails': { method: 'GET', params: { action: 'GetUserDetails' } }
            });

        var tokenResource = $resource(epAxisSettingsVal.inspiniaApiUrl + '/token', {}, {
            'token': {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            }
        });

        function setUser(user, response, persist) {
            var roles = response.roles.toLowerCase().split(',');
            var uRoles = [];
            for (var role in roles) {
                if (_userRoles[roles[role]] !== undefined) {
                    uRoles.push(_userRoles[roles[role]]);
                }
            }
            if (uRoles.length === 0) {
                uRoles.push(_userRoles.auth);
            }

            if (user.useRefreshTokens) {
                localStorageService.set('authorizationData', {
                    token: response,
                    userName: user.userName,
                    refreshToken: response['refresh_token'],
                    useRefreshTokens: true,
                    roles: uRoles,
                    firstName: response.firstName,
                    lastName: response.lastName
                });
            } else {
                localStorageService.set('authorizationData', {
                    token: response,
                    userName: user.userName,
                    refreshToken: '',
                    useRefreshTokens: false,
                    roles: uRoles,
                    firstName: response.firstName,
                    lastName: response.lastName
                });
            }

            _authentication.isAuth = true;
            _authentication.userName = user.userName;
            _authentication.useRefreshTokens = user.useRefreshTokens;
            _authentication.roles = uRoles;
            _authentication.firstName = response.firstName;
            _authentication.lastName = response.lastName;

            if (persist) {
                persistUser(user);
            }
        }

        function logoutUser() {
            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = '';
            _authentication.useRefreshTokens = false;
            _authentication.roles = [_userRoles.public];
        }

        function persistUser(user) {
            localStorageService.set('persistUser', {
                rememberMe: true,
                userName: user.userName
            });
        }

        function _resistUser() {
            localStorageService.remove('persistUser');
        }

        function _procureUser() {
            var userData = localStorageService.get('persistUser');

            if (!userData) {
                userData = {
                    rememberMe: false,
                    userName: ''
                };
            }
            return userData;
        }

        //Start : update User details:-
        var _updateUser = function (EditUser) {

            var deferred = $q.defer();
            if (angular.isUndefined(EditUser.firstName) ||
                angular.isUndefined(EditUser.lastName) ||
                angular.isUndefined(EditUser.email) ||
                angular.isUndefined(EditUser.userName)) {
                deferred.reject({
                    error: 'Insufficient details.',
                    'error_description': 'Insufficient details.'
                });
            }
            else {

                resource.UpdateUserById(EditUser,
                    function (response) {
                        //simple 200 will suffice
                        //Update User Properties
                        _authentication.firstName = EditUser.firstName;
                        _authentication.lastName = EditUser.lastName;

                        //Update Local Storage
                        var authData = angular.copy(localStorageService.get('authorizationData'));
                        localStorageService.set('authorizationData', {
                            token: authData.token,
                            userName: authData.userName,
                            refreshToken: authData.refreshToken,
                            useRefreshTokens: authData.useRefreshTokens,
                            roles: authData.roles,
                            firstName: EditUser.firstName,
                            lastName: EditUser.lastName
                        });

                        deferred.resolve(response);
                    },
                    function (response) {
                        deferred.reject(response);
                        $log.warn(response);
                    }
                );
            }

            return deferred.promise;
        };

        var _getUserInfo = function () {

            var deferred = $q.defer();

            resource.GetUserDetails(
                function (response) {
                    //simple 200 will suffice
                    deferred.resolve(response);
                },
                function (response) {
                    deferred.reject(response);
                    $log.warn(response);
                }

            );

            return deferred.promise;
        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
                _authentication.useRefreshTokens = authData.useRefreshTokens;
                _authentication.roles = authData.roles;
                _authentication.firstName = authData.firstName;
                _authentication.lastName = authData.lastName;
            }
        };

        var _authorize = function (accessLevels, roles) {

            var authData = localStorageService.get('authorizationData');
            if (roles === undefined) {
                if (authData === null) {
                    roles = _authentication.roles;
                } else {
                    roles = authData.roles;
                }
            }

            var allRolesMask = 0;

            /*jshint  bitwise: false */
            for (var i = 0; i < roles.length; i++) {
                allRolesMask = allRolesMask | roles[i].bitMask;
            }

            var allAccessMask = 0;
            for (var j = 0; j < accessLevels.length; j++) {
                allAccessMask = allAccessMask | accessLevels[j].bitMask;
            }

            return allAccessMask & allRolesMask;
        };

        var _login = function (user, persist) {
            var deferred = $q.defer();

            if (angular.isUndefined(user.userName) || angular.isUndefined(user.password)) {
                deferred.reject({
                    error: 'Username/Password',
                    'error_description': 'Invalid or missing username and/or password.'
                });
            } else {
                var params = angular.element.param({
                    username: user.userName,
                    password: user.password,
                    'grant_type': 'password',
                    'client_id':
                    angular.isUndefined(user.useRefreshTokens) ? inspiniaConstant.clientId : ''
                });

                tokenResource.token(params,
                    function (response) {
                        setUser(user, response, persist);

                        //simple 200 will suffice
                        deferred.resolve(response);
                    },
                    function (response) {
                        deferred.reject(response);
                        $log.warn(response);
                    }
                );

            }
            return deferred.promise;
        };

        var _register = function (newUser) {
            var deferred = $q.defer();
            if (angular.isUndefined(newUser.firstName) ||
                angular.isUndefined(newUser.lastName) ||
                angular.isUndefined(newUser.email) ||
                angular.isUndefined(newUser.userName) ||
                angular.isUndefined(newUser.password)) {
                deferred.reject({
                    error: 'Insufficient details.',
                    'error_description': 'Insufficient details.'
                });
            }
            else {

                resource.register(newUser,
                    function (response) {
                        //simple 200 will suffice
                        deferred.resolve(response);
                    },
                    function (response) {
                        deferred.reject(response);
                        $log.warn(response);
                    }
                );
            }

            return deferred.promise;
        };

        var _changePassword = function (newpassword) {

            var deferred = $q.defer();
            if (angular.isUndefined(newpassword.confirmPassword) ||
                angular.isUndefined(newpassword.newPassword) ||
                angular.isUndefined(newpassword.oldPassword)) {
                deferred.reject({
                    error: 'Insufficient details.',
                    'error_description': 'Insufficient details.'
                });
            }
            else {

                resource.changePassword(newpassword,
                    function (response) {
                        //simple 200 will suffice
                        deferred.resolve(response);
                    },
                    function (response) {
                        deferred.reject(response);
                        $log.warn(response);
                    }
                );
            }
            return deferred.promise;
        };

        var _isLoggedIn = function (user) {

            if (user === undefined || user === null) {
                user = _authentication;
            }
            //.role.title == _userRoles.user.title ||
            //user.role.title == _userRoles.admin.title;
            return user.isAuth;
        };

        var _logout = function () {
            var deferred = $q.defer();

            resource.logout({},
                function (response) {
                    logoutUser();
                    deferred.resolve(response);
                },
                function (response) {
                    deferred.reject(response);
                    logoutUser();
                });

            return deferred.promise;
        };

        var _userAuthentication = function () {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                return authData;
            } else {
                return _authentication;
            }
        };

        var _resetPassword = function (user) {
            var deferred = $q.defer();
            if (angular.isUndefined(user.userId) ||
                angular.isUndefined(user.token) ||
                angular.isUndefined(user.newPassword)) {
                deferred.reject({
                    error: 'Insufficient details.',
                    'error_description': 'Insufficient details.'
                });
            }
            else {

                resource.resetPassword(user,
                    function (response) {

                        //simple 200 will suffice
                        deferred.resolve(response);
                    },
                    function (response) {
                        deferred.reject(response);
                        $log.warn(response);
                    }
                );
            }
            return deferred.promise;
        };

        var _forgotPassword = function (user) {
            var deferred = $q.defer();
            if (angular.isUndefined(user.email) || angular.isUndefined(user.siteUrl)) {
                deferred.reject({
                    error: 'Insufficient details.',
                    'error_description': 'Insufficient details.'
                });
            }
            else {
                resource.forgotPassword(user,
                    function (response) {
                        //simple 200 will suffice
                        deferred.resolve(response);
                    },
                    function (response) {
                        deferred.reject(response);
                        $log.warn(response);
                    }
                );
            }

            return deferred.promise;
        };

        factory.logout = _logout;
        factory.fillAuthData = _fillAuthData;
        factory.authorize = _authorize;
        factory.accessLevels = _accessLevels;
        factory.isLoggedIn = _isLoggedIn;
        factory.login = _login;
        factory.register = _register;
        factory.updateUser = _updateUser;
        factory.getUserInfo = _getUserInfo;
        factory.changePassword = _changePassword;
        factory.resetPassword = _resetPassword;
        factory.forgotPassword = _forgotPassword;
        factory.authentication = _authentication;
        factory.resistUser = _resistUser;
        factory.procureUser = _procureUser;

        return factory;

    }
})();
