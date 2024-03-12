
fundoloApp.constant("appUrl", {
    fundPrint: 'http://local.maras.co',
    shorty: 'local.fundingmiracles.com',
    base: 'http://local.fundingmiracles.com',
    api: 'http://api.local.fundingmiracles.com',
    facebook: {
      signInUrl: 'http://api.local.fundingmiracles.com/facebookauth.aspx?u='
    },
    defaultFundImage: '2154630987.png'
  })
  .constant("twitterConfiguration", {
    signInUrl: 'http://api.local.fundingmiracles.com/twitterauth.aspx?f=',
    tweetUrl: 'https://twitter.com/intent/tweet',
    countUrl: "http://cdn.api.twitter.com/1/urls/count.json"
  })
  .constant("wePayConst", {
    webUrl: 'https://stage.wepay.com',
    authUrl: 'https://stage.wepay.com/v2/oauth2/authorize',
    tokenUrl: 'https://stage.wepayapi.com/v2/oauth2/token',
    client_id: '181045', //staging,
    redirect_uri: 'http://local.fundingmiracles.com/wepay/authenticate',
    scope: 'manage_accounts,collect_payments,view_balance,view_user,send_money,refund_payments,preapprove_payments,manage_subscriptions',
    callback_uri: 'http://local.fundingmiracles.com/wepay/ipn',
    credit_card_number: '4003830171874018',
    endpoint: 'stage'
  }); 
