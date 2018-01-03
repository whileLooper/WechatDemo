'use strict';

const Controller = require('egg').Controller;
const wechat = require('co-wechat');

module.exports = app => {
  const config = app.config.wechatConfig;
  class WechatController extends app.Controller {}

  // 因为 Egg 需要用类的形式来组织，而 wechat 是通过 middleware 方法来生成中间件
  WechatController.prototype.index = wechat(config)
    .middleware(async (message, ctx) => {
      return 'hello wechat';
    });

  return WechatController;
};
