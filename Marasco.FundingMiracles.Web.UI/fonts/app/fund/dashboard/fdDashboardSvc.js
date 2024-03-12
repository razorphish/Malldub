'use strict';

fundoloApp.factory('fdDashboardSvc', ['$resource', '$q', '$filter', '$compile', 'seAuthSvc', 'appUrl',
  function ($resource, $q, $filter, $compile, seAuthSvc, appUrl) {
    var p = {};

    //#region === Resources ===

    var resourceSecured = $resource(appUrl.api + '/api/funddetails/:action/:id/:pageNumber/:itemsPerPage',
      { id: '@id', action: '@action', pageNumber: '@pageNumber', itemsPerPage: '@itemsPerPage' }, {
        'save':          { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken } },
        'query':         { method: 'GET',  headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true },
        'summary':       { method: 'GET',  params: { action: 'summary'},      headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true },
        'isMyFund':      { method: 'GET',  params: { action: 'myfund'},       headers: { 'authorization': seAuthSvc.getBearerToken } },
        'update':        { method: 'PUT',  params: { action: 'update'},       headers: { 'authorization': seAuthSvc.getBearerToken } },
        'saveFundImage': { method: 'POST', params: { action: 'fundImage'},    headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true },
        'support':       { method: 'POST', params: { action: 'support'},      headers: { 'authorization': seAuthSvc.getBearerToken } },
        'supporting':    { method: 'GET', params:  { action: 'supporting' },  headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true },
        'subscribe':     { method: 'POST', params: { action: 'subscribe'},    headers: { 'authorization': seAuthSvc.getBearerToken } },
        'copy':          { method: 'POST', params: { action: 'copy' },        headers: { 'authorization': seAuthSvc.getBearerToken } },
        'copy2':         { method: 'POST', params: { action: 'copy2' },       headers: { 'authorization': seAuthSvc.getBearerToken } },
        'supporters':    { method: 'GET',  params: { action: 'supporters' },  },
        'teamedUp':      { method: 'GET',  params: { action: 'teamedUp' },    headers: { 'authorization': seAuthSvc.getBearerToken }, isArray:true },
        'teamMembers':   { method: 'GET',  params: { action: 'teamMembers' }, headers: { 'authorization': seAuthSvc.getBearerToken } },
        'status':        { method: 'POST', params: { action: 'status' },      headers: { 'authorization': seAuthSvc.getBearerToken } },
        'history':       { method: 'GET',  params: { action: 'history' },     headers: { 'authorization': seAuthSvc.getBearerToken } },
      });

    var fundUserResource = $resource(appUrl.api + '/api/fund/:fundId/user/:section/:id/:action/:pageNumber/:itemsPerPage',
      { fundId: '@fundId', section: '@section', id: '@id', action: '@action', pageNumber: '@pageNumber', itemsPerPage: '@itemsPerPage' }, {
        'save':           { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken } },
        'query':          { method: 'GET',  headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true },
        'getBeneficiary': { method: 'GET',  headers: { 'authorization': seAuthSvc.getBearerToken }, params: { section: 'beneficiary' }, isArray: true },
        'update':         { method: 'PUT',  headers: { 'authorization': seAuthSvc.getBearerToken } },
        'fundraisers':    { method: 'GET', params: { section: 'fundraisers' } }
    });

    var fundNoteResource = $resource(appUrl.api + '/api/fund/:fundId/notes/:section/:id/:action/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      section: '@section',
      id: '@id',
      action: '@action',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage'
    }, {
      'save': { method: 'POST' },
      'byFundId': { method: 'GET',  headers: { 'authorization': seAuthSvc.getBearerToken } },
      'updateView': { method: 'PUT',  headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'viewed' } },
      'respond':    { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'respond' } }
    });


    var fundSettingsResource = $resource(appUrl.api + '/api/fundsettings/:action/:id',
    { id: '@id', action: '@action' }, {
      'update': { method: 'PUT', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'update' } }
    });

    var fundTeamResource = $resource(appUrl.api + '/api/fund/:fundId/teams/:id/:section/:action/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      section: '@section',
      id: '@id',
      action: '@action',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage'
    }, {
      'save': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken } },
      'update': { method: 'PUT', headers: { 'authorization': seAuthSvc.getBearerToken } },
      'join': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params : {action:'join'} } 
    });

    var updateResource = $resource(appUrl.api + '/api/fund/:fundId/updates/:section/:id/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      section: '@section',
      id: '@id',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage'
    },
    {
      'save':  { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken } },
      'query':  { method: 'GET', headers: { 'authorization': seAuthSvc.getBearerToken }, isArray: true },
      'update': { method: 'PUT', headers: { 'authorization': seAuthSvc.getBearerToken } },
      'byStatusId': { method: 'GET', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { section: 'status' }, isArray: true }
    });

    var donationResource = $resource(appUrl.api + '/api/fund/:fundId/donations/:section/:id/:action/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      section: '@section',
      id: '@id',
      action: '@action',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage'
    }, {
      'save':        { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken } },
      'saveoffline': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { section: 'offline' } },
      'update':      { method: 'PUT',  headers: { 'authorization': seAuthSvc.getBearerToken } },
      'xlite':       { method: 'PUT',  headers: { 'authorization': seAuthSvc.getBearerToken }, params: { section: 'xlite' } },
      'sendnote': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken }, params: { action: 'sendnote' } }
    });

    var uploadResource = $resource(appUrl.api + '/api/fund/:fundId/uploads/:section/:id/:action/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage',
      action: '@action',
      id: '@id',
      section: '@section'
    }, {
      'save': { method: 'POST', headers: { 'authorization': seAuthSvc.getBearerToken } },
      'update': { method: 'PUT', headers: { 'authorization': seAuthSvc.getBearerToken } },
      'delete': { method: 'DELETE', headers: { 'authorization': seAuthSvc.getBearerToken } }
    });

    //#endregion === Resource ===

    //#region === File Manager ===

    p.removeFile = function (file) {
      var deferred = $q.defer();
      var fileResource = $resource(appUrl.api + '/api/itemuploader/remove', { }, {
        'save': {method: 'POST', headers : {'authorization': seAuthSvc.getBearerToken } }
      });

      fileResource.save(file,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    //#endregion === File Manager ===

    //#region === Fund ===

    p.isMyFund = function (fundId) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.resolve('false');
      } else {

        resourceSecured.isMyFund({ id: fundId },
          function () {
            deferred.resolve('true');
          }, function () {
            deferred.reject('false');
          });
      }

      return deferred.promise;
    };

    p.copy = function (token) {
      var deferred = $q.defer();

      resourceSecured.copy({},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    p.copy2 = function (token) {
      var deferred = $q.defer();

      resourceSecured.copy2({},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    p.summary = function (fundId) {
      var deferred = $q.defer();
      if (angular.isUndefined(fundId) || fundId < 1) {
        deferred.reject();
      } else {

        resourceSecured.summary({ id: fundId },
          function (fund) {
            deferred.resolve(fund);
          }, function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };

    p.allByUser = function () {
      var deferred = $q.defer();
      //var resourceIn = $resource(appUrl.api + '/api/funddetails', {}, {
      //  'query': { method: 'GET', isArray: true, headers: { 'authorization': seAuthSvc.getBearerToken } }
      //});
      resourceSecured.query({ typeId: 'Campaign' },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.supporters = function (id, pageNumber, itemsPerPage) {
      var deferred = $q.defer();
      resourceSecured.supporters({ id: id, pageNumber: pageNumber, itemsPerPage: itemsPerPage },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.teamMembers = function (id) {
      var deferred = $q.defer();
      resourceSecured.teamMembers({ id: id },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.teamedUp = function () {
      var deferred = $q.defer();
      resourceSecured.teamedUp({},
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.supporting = function () {
      var deferred = $q.defer();
      resourceSecured.supporting({},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };


    p.save = function (fund) {
      var deferred = $q.defer();

      if (angular.isUndefined(fund)) {
        deferred.reject();
      } else {

        if (angular.isUndefined(fund.identification) || fund.identification < 0) {
          p.create(fund).then(function (promisedFund) {
            deferred.resolve(promisedFund);
          }, function (response) {
            deferred.reject(response);
          });
        } else {
          p.update(fund).then(function (promisedFund) {
            deferred.resolve(promisedFund);
          }, function (response) {
            deferred.reject(response);
          });
        }
      }

      return deferred.promise;
    };

    p.create = function (fund) {
      var deferred = $q.defer();

      resourceSecured.save(fund,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.update = function (fund) {
      var deferred = $q.defer();

      resourceSecured.update(fund,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.saveFundImage = function (fund) {
      var deferred = $q.defer();

      resourceSecured.saveFundImage(fund,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.support = function (support) {
      var deferred = $q.defer();

      resourceSecured.support(support,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.status = function (fundId, statusId) {
      var deferred = $q.defer();

      resourceSecured.status({fundId: fundId, statusId: statusId},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.subscribe = function (fundId, email, geo) {
      var deferred = $q.defer();

      resourceSecured.subscribe({
        fundId: fundId,
        email: email,
        geo: geo
        },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };


    //#endregion

    //#region === Note ===
    p.fundNoteByFundId = function (fundId, pageNumber, itemsPerPage) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.reject({
          error_description: 'Invalid fund id',
          error: 'Fund Id missing or invalid'
        });
      }

      fundNoteResource.byFundId({ fundId: fundId, pageNumber: pageNumber, itemsPerPage: itemsPerPage },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    p.saveFundNote = function (fundNote) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundNote)) {
        deferred.reject({
          error: 'Invalid note',
          error_description: 'The object [fundNote] is invalid or missing'
        });
      } else {

        if (angular.isUndefined(fundNote.identification) || fundNote.identification < 0) {
          p.createFundNote(fundNote).then(function (promisedFund) {
            deferred.resolve(promisedFund);
          }, function (response) {
            deferred.reject(response);
          });
        } else {
          p.updateFundNote(fundNote).then(function (promisedFund) {
            deferred.resolve(promisedFund);
          }, function (response) {
            deferred.reject(response);
          });
        }
      }

      return deferred.promise;
    };

    p.createFundNote = function (fundNote) {
      var deferred = $q.defer();

      fundNoteResource.save({fundId: fundNote.fundId}, fundNote,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.updateFundNote = function (fundNote) {
      var deferred = $q.defer();

      fundNoteResource.update({fundId : fundNote.fundId, id: fundNote.identification}, fundNote,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.updateFundNoteView = function (fundId, id) {
      var deferred = $q.defer();

      fundNoteResource.updateView({ fundId: fundId, id: id},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.respondFundNote = function (note) {
      var deferred = $q.defer();

      fundNoteResource.respond({ fundId: note.fundNote.fundId, id: note.fundNote.respondNoteId }, note,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.getListClass = function (notification) {
      if (angular.isUndefined(notification)) {
        return 'icon-custom icon-sm rounded-x icon-line icon-bg-red icon-ghost';
      }
      var listClass = 'icon-custom icon-sm rounded-x icon-line ';

      switch (notification.typeId) {
        case 'Support':
          listClass += 'icon-bg-dark-blue icon-trophy';
          break;
        case 'Donation':
          listClass += 'icon-bg-red icon-heart';
          break;
        case 'Joined':
          listClass += 'icon-bg-light-grey fa fa-child';
          break;
        case 'Notification':
          listClass += 'icon-bg-orange icon-envelope';
          break;
        case 'Share':
          listClass += 'icon-bg-green icon-share';
          break;
        case 'Comment':
          listClass += 'icon-bg-blue fa fa-comments';
          break;
        case 'Subscribe':
          listClass += 'icon-bg-sea fa fa-pencil-square-o';
          break;
      }

      return listClass;
    }

    //#endregion

    //#region === Settings ===
    p.saveFundSettings = function (fundSettings) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundSettings)) {
        deferred.reject({
          error: 'Invalid settings',
          error_description: 'The object [fundSettings] is invalid or missing'
        });
      } else {

        if (angular.isUndefined(fundSettings.fundId) || fundSettings.fundId < 0) {
          p.createfundSettings(fundSettings).then(
            function (response) {
              deferred.resolve(response);
              }, function (response) {
                deferred.reject(response);
              });
        } else {
          p.updatefundSettings(fundSettings).then(
            function(response) {
              deferred.resolve(response);
            }, function(response) {
              deferred.reject(response);
            });
        }
      }

      return deferred.promise;
    };

    p.createfundSettings = function (fundSettings) {
      var deferred = $q.defer();

      fundSettingsResource.save(fundSettings,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.updatefundSettings = function (fundSettings) {
      var deferred = $q.defer();

      fundSettingsResource.update(fundSettings,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };
    //#endregion ===/Fund Settings ===

    //#region === User methods ===

    p.getFundUser = function (fundId, pageNumber, itemsPerPage) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId) || fundId < 0) {
        deferred.resolve(mockFundUser);
      } else {
        fundUserResource.getBeneficiary({ id: fundId },
          function (fundUser) {
            deferred.resolve(fundUser);
          },
          function (response) {
            response.data = mockFundUser;
            deferred.reject(response);
          });
      }
      return deferred.promise;
    };

    p.allUpdatesByUserId = function (userId) {
      var deferred = $q.defer();

      updateResource.query({ userId: userId },
        function (fundUpdates) {
          deferred.resolve(fundUpdates);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.saveFundUser = function (fundUser) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundUser)) {
        deferred.reject();
      } else {

        if (angular.isUndefined(fundUser.userId) || fundUser.userId.length === 0) {
          p.createFundUser(fundUser).then(function (promisedFundUser) {
            deferred.resolve(promisedFundUser);
          }, function (response) {
            deferred.reject(response);
          });
        } else {
          p.updateFundUser(fundUser).then(function (promisedFundUser) {
            deferred.resolve(promisedFundUser);
          }, function (response) {
            deferred.reject(response);
          });
        }
      }

      return deferred.promise;
    };

    p.createFundUser = function (fundUser) {
      var deferred = $q.defer();

      fundUserResource.save(fundUser,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.updateFundUser = function (fundUser) {
      var deferred = $q.defer();

      fundUserResource.update(fundUser,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.getFundraisers = function (fundId, pageNumber, itemsPerPage) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId) || fundId < 0) {
        deferred.reject({error_description: 'The fund id is either invalid or is missing', error: 'Invalid Fund Id'});
      } else {
        fundUserResource.fundraisers({ fundId: fundId, pageNumber: pageNumber, itemsPerPage: itemsPerPage },
          function (response) {
            deferred.resolve(response);
          },
          function (response) {
            response.data = mockFundUser;
            deferred.reject(response);
          });
      }
      return deferred.promise;
    };

    //#endregion

    //#region === Donation methods ===

    p.saveDonation = function (donation) {
      var deferred = $q.defer();

      if (angular.isUndefined(donation)) {
        deferred.reject();
      } else {

        if (angular.isUndefined(donation.identification) || donation.identification < 0) {
          if (donation.offlineDonation) {
            p.createOfflineDonation(donation).then(function (promisedDonation) {
              deferred.resolve(promisedDonation);
            }, function (response) {
              deferred.reject(response);
            });
          } else {
            p.createDonation(donation).then(function(promisedDonation) {
              deferred.resolve(promisedDonation);
            }, function(response) {
              deferred.reject(response);
            });
          }
        } else {
          p.updateDonation(donation).then(function (promisedDonation) {
            deferred.resolve(promisedDonation);
          }, function (response) {
            deferred.reject(response);
          });
        }
      }

      return deferred.promise;
    };

    p.saveDonationxLite = function (donation) {
      var deferred = $q.defer();

      if (angular.isUndefined(donation)) {
        deferred.reject();
      } else {
        donationResource.xlite({fundId: donation.fundId, id: donation.identification}, donation,
          function (response) {
            deferred.resolve(response);
          },
          function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };

    p.createDonation = function (donation) {
      var deferred = $q.defer();

      donationResource.save({ fundId: donation.fundId }, donation,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.createOfflineDonation = function (donation) {
      var deferred = $q.defer();

      donationResource.saveoffline({ fundId: donation.fundId }, donation,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.updateDonation = function (donation) {
      var deferred = $q.defer();

      donationResource.update({fundId: donation.fundId}, donation,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.createDonationNote = function (donationNote) {
      var deferred = $q.defer();

      donationResource.sendnote({ fundId: donationNote.fundId, id: donationNote.donationId }, donationNote,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };
    //#endregion === Donations ===

    //#region === Updates methods ===

    p.allUpdatesByFundIdStatusId = function (fundId) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId) || fundId < 0) {
        deferred.reject('Invalid Fund Id [' + fundId + ']');
      } else {
        updateResource.byStatusId({ fundId: fundId, id: 'Active' },
          function (fundUpdates) {
            deferred.resolve(fundUpdates);
          },
          function (response) {
            deferred.reject(response);
          });
      }
      return deferred.promise;
    };

    p.saveUpdate = function (fundUpdate) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundUpdate)) {
        deferred.reject();
      } else {

        if (angular.isUndefined(fundUpdate.identification) || fundUpdate.identification < 0) {

          p.createUpdate(fundUpdate).then(function (promisedUpdate) {
            deferred.resolve(promisedUpdate);
          }, function (response) {
            deferred.reject(response);
          });
        } else {
          p.updateUpdate(fundUpdate).then(function (promisedUpdate) {
            deferred.resolve(promisedUpdate);
          }, function (response) {
            deferred.reject(response);
          });
        }
      }

      return deferred.promise;
    };

    p.createUpdate = function (fundUpdate) {
      var deferred = $q.defer();

      updateResource.save({fundId : fundUpdate.fundId}, fundUpdate,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.updateUpdate = function (fundUpdate) {
      var deferred = $q.defer();

      updateResource.update({fundId : fundUpdate.fundId, id: fundUpdate.identification},fundUpdate,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };
    //#endregion === Fund-Update methods ===

    //#region === Team ===
    p.saveFundTeam = function (fundTeam) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundTeam)) {
        deferred.reject({
          error: 'Invalid fund team',
          error_description: 'The object [FundTeam] is invalid or missing'
        });
      } else {

        if (angular.isUndefined(fundTeam.identification) || fundTeam.identification < 0) {
          p.createFundTeam(fundTeam).then(
            function (response) {
              deferred.resolve(response);
            }, function (response) {
              deferred.reject(response);
            });
        } else {
          p.updateFundTeam(fundTeam).then(
            function (response) {
              deferred.resolve(response);
            }, function (response) {
              deferred.reject(response);
            });
        }
      }

      return deferred.promise;
    };

    p.createFundTeam = function (fundTeam) {
      var deferred = $q.defer();

      fundTeamResource.save({fundId : fundTeam.fundId }, fundTeam,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.updateFundTeam = function (fundTeam) {
      var deferred = $q.defer();

      fundTeamResource.update({id: fundTeam.identification, fundId : fundTeam.fundId }, fundTeam,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.joinFundTeam = function (fundTeam) {
      var deferred = $q.defer();

      fundTeamResource.join({ fundId: fundTeam.fundId, id : fundTeam.identification},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.fundTeamByFundId = function(fundTeam) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.reject({
          error_description: 'Invalid fund id',
          error: 'Fund Id missing or invalid'
        });
      }

      fundTeamResource.byFundId({ fundId: fundId },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }
    //#endregion ===/Fund Settings ===

    //#region === History ===

    p.history = function (fundId, pageNumber, itemsPerPage) {
      var deferred = $q.defer();
      if (angular.isUndefined(fundId) || fundId < 1) {
        deferred.reject();
      } else {

        resourceSecured.history({ id: fundId, pageNumber: pageNumber, itemsPerPage: itemsPerPage },
          function (items) {
            deferred.resolve(items);
          }, function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };
    //#endregion

    //#region === Uploads ===

    p.updateFundUploads = function (fundId, uploads) {
      var deferred = $q.defer();

      uploadResource.update({ fundId: fundId }, uploads,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.deleteFundUploads = function (fundId, id) {
      var deferred = $q.defer();

      uploadResource.delete({ fundId: fundId, id: id},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.saveFundUpload = function (fundId, upload) {
      var deferred = $q.defer();

      uploadResource.save({ fundId: fundId}, upload,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    //#endregion

    //#region === Fundraiser ===
    var fundFundraiserResource = $resource(appUrl.api + '/api/fund/:fundId/fundraiser/:section/:id/:action/:pageNumber/:itemsPerPage',
    { fundId: '@fundId', section: '@section', id: '@id', action: '@action', pageNumber: '@pageNumber', itemsPerPage: '@itemsPerPage' }, {
      'query': { method: 'GET', isArray: true },
    });

    p.fundraiserByFundId = function (fundId, pageNumber, itemsPerPage) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.reject({
          error_description: 'Invalid fund id',
          error: 'Fund Id missing or invalid'
        });
      }

      fundFundraiserResource.query({ fundId: fundId, pageNumber: pageNumber, itemsPerPage: itemsPerPage },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }
    //#endregion

    //#region === Mocks ===

    var mockFundUser = {
      fundId: 0,
      userId: '',
      userTypeId: '',
      aspNetUser: {
        firstName: '',
        lastName: '',
        name: '',
        userAddressList: [{
          isDefault: true,
          address: {}
        }],
        userPhoneList: [{
          isDefault: true,
          phone: {
            typeId: 'Mobile'
          }
        }],
        userEmailList: [{
          isDefault: true,
          email: {}
        }]
      }
    };

    //#endregion === Mocks ===

    return p;
  }]);