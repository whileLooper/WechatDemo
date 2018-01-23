'use strict';

const Controller = require('egg').Controller;
const sha1 = require('sha1');

class WechatController extends Controller {
  async index() {
    
    var that = this;
    var config = this.config.wechat;
    var token = config.token;
    var signature = this.ctx.query.signature;
    var nonce = this.ctx.query.nonce;
    var timestamp = this.ctx.query.timestamp;
    var echostr = this.ctx.query.echostr;
    var str = [token, timestamp, nonce].sort().join('');
    var sha = sha1(str);


    if (sha === signature) {
      this.ctx.body = echostr + '';
    } else {
      this.ctx.body = 'Invalid Signature';
    }
  }
}

module.exports = WechatController;
