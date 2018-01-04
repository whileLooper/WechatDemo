'use strict';

const Controller = require('egg').Controller;
const config = {
  appid: 'wxd61026a80b610e7c',
  appSecret: '587a45fca820916e183acca9e41839e'
}
const wechat = require('co-wechat');

class WechatController extends Controller {
  async index() {
    var api = new API(config.appid, config.appsecret);
    var token = await api.getAccessToken();
    this.ctx.body = token;
  }
}

module.exports = WechatController;
