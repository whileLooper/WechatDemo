'use strict';

const Controller = require('egg').Controller;
const sha1 = require('sha1');
const weixin = require('../wechat/weixin');
const Wechat = require('../wechat/wechat');
const util = require('../wechat/util');

class WechatController extends Controller {
  async index() {
    // this.app.use(wechat(this.config.initWechat, weixin.reply, this.ctx));
  
    let wechat = new Wechat(this.config.initWechat);
    
    let that = this.ctx;
    let token = this.config.initWechat.token;
    let signature = that.query.signature;
    let nonce = that.query.nonce;
    let timestamp = that.query.timestamp;
    let echostr = that.query.echostr;
    let str = [token, timestamp, nonce].sort().join('');
    let sha = sha1(str);
    
    if (that.method === 'GET') {
      if (sha === signature) {
        that.body = echostr + '';
      } else {
        that.body = 'Invalid Signature';
      }
    } else if (that.method === 'POST') {
      console.log('posting...');
      if (sha !== signature) {
        that.body = 'wrong';
        return false;
      }
      console.log(that.req);

      var data = await getRowBody(that.req, {
        length: that.length,
        limit: '1mb',
        encoding: that.charset
      });
      
      var content = await util.parseXMLAsync(data);
      var message = await util.formatMessage(content.xml);
      

      that.weixin = message;
      await weixin.reply.call(that, next);

      wechat.reply.call(that);
    }
  }
}

module.exports = WechatController;
