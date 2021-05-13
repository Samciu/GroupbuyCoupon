exports.beforeRequestPayment = function (paymentArgs, callback) {
  // 注意：
  // 功能页函数（这个函数）不应 require 其他非 functional-pages 目录中的文件，
  // 其他非 functional-pages 目录中的文件也不应 require 这个目录中的文件，
  // 这样的 require 调用在未来将不被支持。
  //
  // 同在 functional-pages 中的文件可以 require
  // var getOpenIdURL = require('./URL').getOpenIdURL;
  var paymentURL = "http://zhongyong.wxneed.com/minapp/v1/wxpay/test";

  // 自定义的参数，此处应为从插件传递过来的 'A'
  var customArgument = paymentArgs.customArgument;

  console.log(customArgument)

  // 第一步：调用 wx.login 方法获取 code，然后在服务端调用微信接口使用 code 换取下单用户的 openId
  // 具体文档参考 https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=20161230#wxloginobject
  wx.login({
    success: function (data) {
      wx.request({
        url: paymentURL,
        data: { openid: '111' },
        header: {
          'Appid': 'zy36aab89b0773212d',
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJtaW5hcHBfNjA3OWFhZjBhMGUyMjMuMDQ4Njk3ODAiLCJpYXQiOjE2MTg1ODYzNTIsIm5iZiI6MTYxODU4NjM1MiwiZXhwIjoxODc3Nzg2MzUyLCJpZCI6MjA4MDkwLCJqd3Rfc2NlbmUiOiJtaW5hcHAifQ.apO3qfuK53am_xXIHbND6HP0ibVNIuP-1N3LTV6hgAI`
        },
        method: 'POST',
        success: function (res) {
          console.log('unified order success, response is:', res);
          var payargs = res.data.data.payInfo;
          // 第三步：调用回调函数 callback 进行支付
          // 在 callback 中需要返回两个参数： err 和 requestPaymentArgs：
          // err 应为 null （或者一些失败信息）；
          // requestPaymentArgs 将被用于调用 wx.requestPayment，除了 success/fail/complete 不被支持外，
          // 应与 wx.requestPayment 参数相同。
          var error = null;
          var requestPaymentArgs = {
            timeStamp: payargs.timeStamp,
            nonceStr: payargs.nonceStr,
            package: payargs.package,
            signType: payargs.signType,
            paySign: payargs.paySign,
            extraData: { // 用 extraData 传递自定义数据
              timeStamp: payargs.timeStamp
            },
          };

          console.log('requestPaymentArgs',requestPaymentArgs)

          callback(error, requestPaymentArgs);
        }
      });
    },
    fail: function (err) {
      console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
      // callback 第一个参数为错误信息，返回错误信息
      callback(err);
    }
  });
}