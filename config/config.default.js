'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1515009949472_7572';

  // add your config here
  config.middleware = [];

  // wechat config
  config.wechatConfig = {
    port: '80',
    token: 'bhu89ijnmko0',
    appid: 'wxd61026a80b610e7c',
    appSecret: '587a45fca820916e183acca9e41839e',
    encodingAESKey: 'HX2DzbFRh9qY4toNv9XVL1kYxgoYCTwoZ3haN92kAzl',
    apiDomain: 'https://api.weixin.qq.com/',
    accessTokenFilePath: './static/access_token.json',
  };

  return config;
};
