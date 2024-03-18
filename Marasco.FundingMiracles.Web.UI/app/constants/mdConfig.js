
fundoloApp.constant("appUrl", {  
    fundPrint: 'https://print.fundingmiracles.com',
    shorty: 'www.fundingmiracles.com', 
    base: 'https://www.fundingmiracles.com',
    api: 'https://api.fundingmiracles.com',
    facebook: {
      signInUrl: 'https://api.fundingmiracles.com/facebookauth.aspx?u=' 
    },
    defaultFundImage: '9406317528.png'
  })
.constant("twitterConfiguration", {
  signInUrl: 'https://api.fundingmiracles.com/twitterauth.aspx?f=',
  tweetUrl: 'https://twitter.com/intent/tweet',
  countUrl: "http://cdn.api.twitter.com/1/urls/count.json"
})
.constant("wePayConst", {
  webUrl: 'https://www.wepay.com',
  authUrl: 'https://www.wepay.com/v2/oauth2/authorize',
  tokenUrl: 'https://wwww.wepayapi.com/v2/oauth2/token',
  client_id: '135196', //production,
  //authUrl: 'https://stage.wepay.com/v2/oauth2/authorize',
  //tokenUrl: 'https://stage.wepayapi.com/v2/oauth2/token',
  //client_id: '181045', //staging,
  redirect_uri: 'https://www.fundingmiracles.com/wepay/authenticate',
  scope: 'manage_accounts,collect_payments,view_balance,view_user,send_money,refund_payments,preapprove_payments,manage_subscriptions',
  callback_uri: 'https://www.fundingmiracles.com/wepay/ipn',
  endpoint: 'production'
});
