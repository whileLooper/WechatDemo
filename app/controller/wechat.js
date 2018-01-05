'use strict';

const wechat = require('co-wechat');

module.exports = app => {
  class WechatController extends app.Controller {}

  // 因为 Egg 需要用类的形式来组织，而 wechat 是通过 middleware 方法来生成中间件
  WechatController.prototype.index = wechat({
    port: '80',
    token: 'bhu89ijnmko0',
    appid: 'wxd61026a80b610e7c',
    appSecret: '0e49baa28dd88439372c4788a619aa16',
    encodingAESKey: 'HX2DzbFRh9qY4toNv9XVL1kYxgoYCTwoZ3haN92kAzl',
    apiDomain: 'https://api.weixin.qq.com/',
    accessTokenFilePath: './static/access_token.json'
  }).middleware( () => {
    // TODO
    return {
      content: 'text object',
      type: 'text'
    };
  });

  return WechatController;
};