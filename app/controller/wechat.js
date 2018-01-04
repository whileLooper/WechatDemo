'use strict';

const Controller = require('egg').Controller;
const wechat = require('co-wechat');
const API = require('co-wechat-api');
const config = {
  appid: 'wxd61026a80b610e7c',
  appSecret: '587a45fca820916e183acca9e41839e'
}

class WechatController extends Controller {
  async index() {
    var api = new API(config.appid, config.appsecret);
    var token = await api.getAccessToken();
    this.ctx.body = token;
  }
}

module.exports = WechatController;
