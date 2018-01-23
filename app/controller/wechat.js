'use strict';

const Controller = require('egg').Controller;
const sha1 = require('sha1');
const wechat = require('co-wechat');

class WechatController extends Controller {
  async wechat() {
    // this.app.middleware.initWechat();

    
    wechat(this.config.initWechat).middleware(async (message, ctx) => {
      console.log('hello');
      return 'hello';
      await next();
    });
  }
}

module.exports = WechatController;
