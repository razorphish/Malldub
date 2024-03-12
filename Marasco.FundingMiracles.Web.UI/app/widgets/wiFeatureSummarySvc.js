fundoloApp.factory('wiFeatureSummarySvc', function() {
  'use strict';
  var p = {};

  p.featureSummaries = [
    {
      title: 'You Create',
      summary: 'Online fundraising made easy using our Campaign Creator. Within a few minutes, create then publish your fundraiser and share with your friends and family...',
      iconClass: 'fa fa-edit'
    }, {
      title: 'They Donate',
      summary: 'Share on Facebook, Twitter or by Email. The more you share the more responses you will get and the quicker you will get to your fund goal. Need help? Contact us for additional tips...',
      iconClass: 'fa fa-heart'
    }, {
      title: 'We Change Lives',
      summary: 'Miracles was created to help provide fast and easy funding services for any cause. When you create, and others donate, we all contribute to changing the lives of those in need...',
      iconClass: 'fa fa-smile-o'
    }
  ];

  return p;
});