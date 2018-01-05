'use strict';

const Controller = require('egg').Controller;
const wechat = require('co-wechat');

class WechatController extends Controller {
  async index() { 
    wechat(this.app.config.wechatConfig);
  }
}

module.exports = WechatController;