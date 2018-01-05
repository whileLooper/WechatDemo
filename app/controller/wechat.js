'use strict';

const Controller = require('egg').Controller;
const wechat = require('co-wechat');

class WechatController extends Controller {
  async index() {    
    wechat(this.app.config.wechatConfig).middleware(async (message, ctx) => {
      console.log(message);
      ctx.body = message;
    });
  }
}

module.exports = WechatController;