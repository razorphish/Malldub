(function () {
    'use strict';

    angular
        .module('ep.authorization')
        .factory('routingConfig', routingConfig);

    routingConfig.$inject = [];

    function routingConfig() {

        var config = {
            /* List all the roles you wish to use in the app
            * You have a max of 31 before the bit shift pushes the accompanying integer out of
            * the memory footprint for an integer
            */
            roles: [
                'public',
                'auth',
                'user',
                'admin',
                'devuser'],

            /*
            Build out all the access levels you want referencing the roles listed above
            You can use the '*' symbol to represent access to all roles
             */
            accessLevels: {
                'public': '*',
                'anon': ['public'],
                'user': ['user', 'devuser'],
                'dev': ['devuser'],
                'admin': ['admin'],
                'auth': ['auth', 'user', 'admin', 'devuser']
            }
        };

        var service = {};
        service.userRoles = buildRoles(config.roles);
        service.accessLevels = buildAccessLevels(config.accessLevels, service.userRoles);

        return service;

        /*
            Method to build a distinct bit mask for each role
            It starts off with "1" and shifts the bit to the left for each element in the
            roles array parameter
         */

        function buildRoles(roles) {

            var bitMask = '01';
            var userRoles = {};

            for (var role in roles) {
                if (roles.hasOwnProperty(role)) {
                    var intCode = parseInt(bitMask, 2);
                    userRoles[roles[role]] = {
                        bitMask: intCode,
                        title: roles[role]
                    };
                    /*jslint bitwise: true */
                    bitMask = (intCode << 1).toString(2);
                }
            }

            return userRoles;
        }

        /*
        This method builds access level bit masks based on the accessLevelDeclaration parameter which must
        contain an array for each access level containing the allowed user roles.
         */
        function buildAccessLevels(accessLevelDeclarations, userRoles) {

            var accessLevels = {};
            var resultBitMask = '';

            for (var level in accessLevelDeclarations) {

                if (typeof accessLevelDeclarations[level] === 'string') {
                    if (accessLevelDeclarations[level] === '*') {

                        for (var i = 0; i < userRoles.length; i++) {
                            resultBitMask += '1';
                        }
                        //accessLevels[level] = parseInt(resultBitMask, 2);
                        accessLevels[level] = {
                            bitMask: parseInt(resultBitMask, 2),
                            title: accessLevelDeclarations[level]
                        };
                    } else {
                        if (window.console) {
                            console.log('Access Control Error: Could not parse \'' +
                                accessLevelDeclarations[level] +
                                '\' as access definition for level \'' +
                                level +
                                '\'');
                        }
                    }
                }
                else {

                    accessLevels[level] =
                        getDeclarationAccessLevels(
                            accessLevelDeclarations,
                            level,
                            userRoles,
                            accessLevels);
                }
            }

            return accessLevels;
        }

        function getDeclarationAccessLevels(
            accessLevelDeclarations, level, userRoles, accessLevels) {
            var resultBitMask = 0;
            for (var role in accessLevelDeclarations[level]) {
                if (userRoles.hasOwnProperty(accessLevelDeclarations[level][role])) {
                    /*jslint bitwise: true */
                    resultBitMask = resultBitMask |
                        userRoles[accessLevelDeclarations[level][role]].bitMask;
                }
                else {
                    if (window.console) {
                        console.log('Access Control Error: Could not find role \'' +
                            accessLevelDeclarations[level][role] +
                            '\' in registered roles while building access for \'' +
                            level +
                            '\'');
                    }
                }
            }
            return {
                bitMask: resultBitMask,
                title: accessLevelDeclarations[level][role]
            };
        }
    }
})();
