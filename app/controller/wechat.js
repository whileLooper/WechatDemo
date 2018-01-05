'use strict';

const Controller = require('egg').Controller;
const wechat = require('co-wechat');

class WechatController extends Controller {
  async index() {
    this.ctx.body = 'hi, wechat';
    this.app.use(wechat(this.config.wechatConfig).middleware(async (message, ctx) => {
      return 'hello world';
    }));
  }
}

module.exports = WechatController;
