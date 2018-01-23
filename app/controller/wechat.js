'use strict';

const Controller = require('egg').Controller;
const sha1 = require('sha1');

class WechatController extends Controller {
  async index() {
    
    this.app.middleware.initWechat(this.config.wechat);
  }
}

module.exports = WechatController;
