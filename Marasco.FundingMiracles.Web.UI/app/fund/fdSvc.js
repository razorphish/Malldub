fundoloApp.factory('fdSvc', ['$resource', '$q', '$filter', '$compile', 'appUrl', 
  function ($resource, $q, $filter, $compile, appUrl) {
    'use strict';
    var p = {}; 

    //#region === Resources ===
    var resource = $resource(appUrl.api + '/api/funddetails/:action/:id',
    { id: '@id', action: '@action' }, {
      'featured':     { method: 'GET', params: { action: 'featured' }, isArray: true },
      'completed':    { method: 'GET', params: { action: 'completed' }, isArray: true },
      'byPermalink':  { method: 'GET', params: { action: 'permalink' }, isArray: true },
      'basic':        { method: 'GET', params: { action: 'basic' }, isArray: true },
      'share':        { method: 'POST', params: { action: 'share' }, isArray: true }
    });

    var searchResource = $resource(appUrl.api + '/api/fund/search/:category/:pageNumber/:itemsPerPage/:searchText/:sortCriteria',
    {
      category: '@category',
      searchText: '@searchText',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage',
      sortCriteria: '@sortCriteria',
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
      'save': { method: 'POST' }
    });

    var fundTeamResource = $resource(appUrl.api + '/api/fund/:fundId/teams/:section/:id/:action/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      section : '@section',
      id: '@id',
      action: '@action',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage'
    }, {
      'byFundId': { method: 'GET', isArray: true }
    });

    var fundCommentResource = $resource(appUrl.api + '/api/fund/:fundId/comments/:section/:id/:action/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      id: '@id',
      action: '@action',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage',
      section: '@section'
    }, {
      'byFundId': { method: 'GET',isArray: false },
      'like': { method: 'POST', params: { action: 'like' } }
    });

    var fundDonationResource = $resource(appUrl.api + '/api/fund/:fundId/donations/:section/:id/:action/:pageNumber/:itemsPerPage',
    {
      fundId: '@fundId',
      section: '@section',
      id: '@id',
      pageNumber: '@pageNumber',
      itemsPerPage: '@itemsPerPage',
      action: '@action'
    }, {
      'query' : {method : 'GET', isArray: false}
    });
  
    //#endregion === Resource ===
  
    //#region === Search ===
  
    p.search = function (category, searchText, pageNumber, itemsPerPage, sortCriteria) {
      var deferred = $q.defer();

      if (angular.isUndefined(category) || angular.isUndefined(searchText)) {
        deferred.reject({
          error: 'Missing search variables',
          error_description: 'Oops! Looks like we can\'t find your search criteria.  Lets try again'
        });
      } else {

        searchResource.get(
          {
            category: category,
            searchText: searchText,
            pageNumber: pageNumber,
            itemsPerPage: itemsPerPage,
            sortCriteria: sortCriteria
          },
          function (funds) {
            deferred.resolve(funds);
          },
          function (response) {
            deferred.reject(response);
          }
        );
      }
      return deferred.promise;
    };
  
    //#endregion === Search ===
  
    //#region === Fund ===

    p.copy = function(fundId, token) {
      var resourceSecured = $resource(appUrl.api + '/api/funddetails/:action/:id',
        { id: '@id', action: '@action' }, {
          'copy': { method: 'POST', params: { action: 'copy' }, headers: { 'authorization': token } }
        });
      var deferred = $q.defer();

      resourceSecured.copy({id : fundId},
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    p.copy2 = function (fundId, token) {
      var resourceSecured = $resource(appUrl.api + '/api/funddetails/:action/:id',
        { id: '@id', action: '@action' }, {
          'copy2': { method: 'POST', params: { action: 'copy2' }, headers: { 'authorization': token } }
        });
      var deferred = $q.defer();

      resourceSecured.copy2({ id: fundId },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }
  
    p.featured = function(numberToTake) {
      var deferred = $q.defer();

      if (!angular.isNumber(numberToTake)) {
        deferred.reject({
          error_description: 'Invalid number for featured query'
        });
      } else {
        resource.featured({ numberToTake: numberToTake },
          function(promisedFunds) {
            deferred.resolve(promisedFunds);
          },
          function(response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };
  
    p.completed = function (numberToTake) {
      var deferred = $q.defer();

      if (!angular.isNumber(numberToTake)) {
        deferred.reject({
          error_description: 'Invalid number for completed query'
        });
      } else {
        resource.completed({ numberToTake: numberToTake },
          function (promisedFunds) {
            deferred.resolve(promisedFunds);
          },
          function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };

    p.basic = function(fundId) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.reject({
          error: 'Fund Id',
          error_description: 'Invalid fund Id'
        });
      } else {
      
        resource.basic({ id: fundId },
          function(promisedFund) {
            deferred.resolve(promisedFund);
          },
          function(response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };

    p.byPermalink = function (permalink) {
      var deferred = $q.defer();
      if (angular.isUndefined(permalink) || permalink.length === 0) {
        deferred.resolve(mockFund);
      } else {

        resource.byPermalink({ id: permalink },
          function (fund) {
            deferred.resolve(fund);
          }, function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };

    p.share = function (model) {
      var deferred = $q.defer();

      if (angular.isUndefined(model)) {
        deferred.resolve({
          error: 'Missing or invalid share model',
          error_description: 'The model for sharing is invalid.'
        });
      } else {

        resource.share(model,
          function (response) {
            deferred.resolve(response);
          }, function (response) {
            deferred.reject(response);
          });
      }

      return deferred.promise;
    };

    p.support = function (support, token) {
      var resourceSecured = $resource(appUrl.api + '/api/funddetails/:action/:id',
      { id: '@id', action: '@action' }, {
        'support': { method: 'POST', params: { action: 'support' }, headers: { 'authorization': token} }
      });
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

    p.supportByUser = function (fundId, token) {
      var resourceSecured = $resource(appUrl.api + '/api/funddetails/:action/:id',
      { id: '@id', action: '@action' }, {
        'support': { method: 'GET', params: { action: 'support' }, headers: { 'authorization': token } }
      });
      var deferred = $q.defer();

      resourceSecured.support({ id: fundId },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.supportsByUser = function (fundId, token) {
      var resourceSecured = $resource(appUrl.api + '/api/funddetails/:action/:id',
      { id: '@id', action: '@action' }, {
        'supports': { method: 'GET', params: { action: 'supports' }, headers: { 'authorization': token }, isArray: true }
      });
      var deferred = $q.defer();

      resourceSecured.supports({ id: fundId },
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    };

    p.getTotalDonation = function (donationList, useBeneAmount) {
      if (angular.isUndefined(donationList) || donationList === null) {
        return 0;
      }

      if (angular.isArray(donationList)) {
        var sum = 0;
        for (var t = 0; t < donationList.length; t++) {
          if (useBeneAmount) {
            sum += donationList[t].beneficiaryAmount;
          } else {
            sum += donationList[t].amount;
          }
        }
        return sum.toFixed(2);
      } else {
        return 0;
      }
    };

    p.getTotalDonationDateFrom = function(donationList, fromDays, useBeneAmount) {
      if (angular.isUndefined(donationList) || donationList === null) {
        return 0;
      }

      if (angular.isArray(donationList)) {
        var sum = 0;
        var momentFrom = moment().subtract(fromDays, 'days').format();
        for (var t = 0; t < donationList.length; t++) {
          if (moment(donationList[t].dateEntered).isAfter(momentFrom)) {
            if (useBeneAmount) {
              sum += donationList[t].beneficiaryAmount;
            } else {
              sum += donationList[t].amount;
            }
          }
        }
        return sum.toFixed(2);
      } else {
        return 0;
      }
    }

    p.getTotalDonationMonthToMonth = function (donationList, useBeneAmount, goalAmount) {
      if (angular.isUndefined(donationList) || donationList === null) {
        return 0;
      }

      if (angular.isArray(donationList)) {
        var sumLastMonth   = 0;
        var sumMonthBefore = 0;
        var sum            = 0;
        var lastMonth      = moment().subtract(30, 'days').format();
        var monthBefore    = moment().subtract(60, 'days').format();
        for (var t = 0; t < donationList.length; t++) {


          if (moment(donationList[t].dateEntered).isAfter(lastMonth)) {
            if (useBeneAmount) {
              sumLastMonth += donationList[t].beneficiaryAmount;
            } else {
              sumLastMonth += donationList[t].amount;
            }
          }

          if (moment(donationList[t].dateEntered).isBetween(monthBefore, lastMonth)) {
            if (useBeneAmount) {
              sumMonthBefore += donationList[t].beneficiaryAmount;
            } else {
              sumMonthBefore += donationList[t].amount;
            }
          }

          if (useBeneAmount) {
            sum += donationList[t].beneficiaryAmount;
          } else {
            sum += donationList[t].amount;
          }
        }
        sum = sum === 0 ? goalAmount : sum;

        var totalBalance = sumMonthBefore === 0 ? sum : sumMonthBefore;
        var percentage = ((sumLastMonth - sumMonthBefore) / totalBalance) * 100;
        return percentage;
      } else {
        return 0;
      }
    }

    p.isMyFund = function (fundId, token) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.resolve('false');
      } else {
        var resourceSecured = $resource(appUrl.api + '/api/funddetails/:action/:id',
            { id: '@id', action: '@action'}, {
          'isMyFund': { method: 'GET', params: { action: 'myfund' }, headers: { 'authorization': token } }
        });
        resourceSecured.isMyFund({ id: fundId },
          function () {
            deferred.resolve('true');
          }, function () {
            deferred.reject('false');
          });
      }

      return deferred.promise;
    };

    p.getProgressPercentageWidth = function(fund) {
      if (angular.isUndefined(fund.goalAmount) || !angular.isNumber(fund.goalAmount)) {
        return 0;
      }
      var percentageNumber = this.getProgressPercentage(fund);
      var percentage = {
        'width': $filter('number')(percentageNumber, 0) + '%'
      };

      return percentage;
    };

    p.getProgressPercentage = function (fund, useBeneAmount) {
      if (angular.isUndefined(fund)) {
        return 0;
      }
      var percentageNumber = (this.getTotalDonation(fund.donationList, useBeneAmount) / fund.goalAmount) * 100;
      return percentageNumber;
    };

    p.checkExpiration = function(endDate) {
      var start = moment(endDate);
      var end = moment();
      return end.diff(start) > 0;
    }

      //#endregion

    //#region === Fund Note ===

    p.saveFundNote = function(fundNote) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundNote)) {
        deferred.reject({
          error: 'Invalid note',
          error_description: 'The object [fundNote] is invalid or missing'
        });
      } else {

        if (angular.isUndefined(fundNote.identification) || fundNote.identification < 0) {
          p.createFundNote(fundNote)
            .then(function (promisedFund) {
            deferred.resolve(promisedFund);
          }, function(response) {
            deferred.reject(response);
          });
        }
      }

      return deferred.promise;
    }

    p.createFundNote = function(fundNote) {
      var deferred = $q.defer();

      fundNoteResource.save({ fundId: fundNote.fundNote.fundId }, fundNote,
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    //#endregion

    //#region === Fund Team ===

    p.fundTeams = function(fundId) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.reject({
          error_description: 'Invalid fund id',
          error: 'Fund Id missing or invalid'
        });
      }

      fundTeamResource.byFundId({ fundId: fundId },
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    p.fundTeamJoin = function(fundId, teamId, token) {
      var resourceSecured = $resource(appUrl.api + '/api/fund/:fundId/teams/:id/:action',
      { id: '@id', action: '@action', fundId: '@fundId' }, {
        'join': { method: 'POST', params: { action: 'join' }, headers: { 'authorization': token } }
      });
      var deferred = $q.defer();

      resourceSecured.join({ fundId: fundId, id: teamId },
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }
    //#endregion

    //#region === Comments ===

    p.comment = function(fundId, pageNumber, itemsPerPage) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId) ) {
        deferred.reject({
          error: 'Missing variables',
          error_description: 'Oops! Looks like we can\'t find fund comments.  Lets try again'
        });
      } else {

        fundCommentResource.byFundId({ fundId: fundId, pageNumber: pageNumber, itemsPerPage: itemsPerPage },
          function(items) {
            deferred.resolve(items);
          },
          function(response) {
            deferred.reject(response);
          }
        );
      }
      return deferred.promise;
    };

    p.commentLike = function(fundId, comment) {

      var deferred = $q.defer();

      fundCommentResource.like({ fundId: fundId }, comment,
        function (response) {
          deferred.resolve(response);
        },
        function (response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    p.commentSave = function(fundId, comment, token) {
      var resourceSecured = $resource(appUrl.api + '/api/fund/:fundId/comments',
        {
          fundId: '@fundId',
        }, {
          'save': { method: 'POST', headers: { 'authorization': token } }
        });
      var deferred = $q.defer();

      resourceSecured.save({fundId: fundId}, comment,
        function(response) {
          deferred.resolve(response);
        },
        function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    //#endregion === Comments ===

    //#region === Donations ===

    p.donations = function (fundId, pageNumber, itemsPerPage) {
      var deferred = $q.defer();

      if (angular.isUndefined(fundId)) {
        deferred.reject({
          error: 'Missing variables',
          error_description: 'Oops! Looks like we can\'t find fund donations.  Lets try again'
        });
      } else {

        fundDonationResource.query({ fundId: fundId, pageNumber: pageNumber, itemsPerPage: itemsPerPage },
          function (items) {
            deferred.resolve(items);
          },
          function (response) {
            deferred.reject(response);
          }
        );
      }
      return deferred.promise;
    };
    //#endregion

    //#region === Image ===

    p.getMainImage = function (uploadList, width, height) {
      var i = 0;
      var mainFundImage = '/azure/img/' + appUrl.defaultFundImage + '?height=' + height + '&width=' + width + '&mode=crop&scale=both';
      width             = width || 262;
      height            = height || 197;

      if (uploadList.length > 0) {

        //mainFundImage = '/azure/' + uploadList[0].upload.containerName + '/'
        //  + uploadList[0].upload.name + '?height=' + height + '&width=' + width + '&mode=crop&scale=both';

        mainFundImage = uploadList[0].upload.locationHttp + '?height=' + height + '&width=' + width + '&mode=crop&scale=both';

        angular.forEach(uploadList, function (item, key) {

          if (item.isDefault || i === 0) {
            switch (item.upload.typeId) {
              case 'web.Video.Vimeo':
              case 'web.Video.YouTube':
                mainFundImage = item.upload.name;
                break;
              default:
                //mainFundImage = '/azure/' + item.upload.containerName + '/'
                //  + item.upload.name
                //  + '?height=' + height + '&width=' + width + '&mode=crop&scale=both';

                mainFundImage = item.upload.locationHttp
                  + '?height=' + height + '&width=' + width + '&mode=crop&scale=both';
                break;
            }
          }

          i++;
        });
      } 

      return mainFundImage;
    }
    //#endregion

    //#region === Mocks ===
  
    var mockFund = {
      goalAmount: 0,
      pageColor: 'default',
      item: {
        typeId: 'FundoloFund',
        transactionTypeId: 'Donation',
        title: 'Customize your Campaign',
        shortSummary: '',
        description: '',
        endDate: '',
        userId: '',
        itemUploadList: []
      },
      fundUserList: [{
        userId: '',
        userTypeId: 'Originator'
      }
      ]
    };
  
    //#endregion === Mocks ===
  
  return p;
}]);