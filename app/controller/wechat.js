'use strict';

const Controller = require('egg').Controller;
const sha1 = require('sha1');
const getRowBody = require('raw-body');
const weixin = require('../wechat/weixin');
const Wechat = require('../wechat/wechat');
const util = require('../wechat/util');
// const fileRW = require('../../libs/util');

// let path = require('path');
// let wechat_file = path.join(__dirname, '../../config/test.txt');

class WechatController extends Controller {
  async index() {
    // this.app.use(wechat(this.config.initWechat, weixin.reply, this.ctx));

    const wechat = new Wechat(this.config.initWechat);

    const that = this.ctx;
    const token = this.config.initWechat.token;
    const signature = that.query.signature;
    const nonce = that.query.nonce;
    const timestamp = that.query.timestamp;
    const echostr = that.query.echostr;
    const str = [ token, timestamp, nonce ].sort().join('');
    const sha = sha1(str);

    if (that.method === 'GET') {
      if (sha === signature) {
        that.body = echostr + '';
      } else {
        that.body = 'Invalid Signature';
      }
    } else if (this.method === 'POST') {
      if (sha !== signature) {
        this.body = 'wrong';
        return false;
      }

      const data = await getRowBody(this.req, {
        length: this.length,
        limit: '1mb',
        encoding: this.charset,
      });

      const content = await util.parseXMLAsync(data);
      const message = await util.formatMessage(content.xml);

      this.weixin = message;
      await weixin.reply.call(this);

      wechat.reply.call(this);
    }
  }
}

module.exports = WechatController;
