'use strict';

const Controller = require('egg').Controller;
const contentType = require('content-type');
const sha1 = require('sha1');
const getRowBody = require('raw-body');
const weixin = require('../wechat/weixin');
const Wechat = require('../wechat/wechat');
const util = require('../wechat/util');
// const fileRW = require('../../libs/util');

// const path = require('path');
// const wechat_file = path.join(__dirname, '../../config/test.txt');

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

    if (that.method === 'POST') {
      console.log('inside getting...');
      if (sha === signature) {
        that.body = echostr + '';
      } else {
        that.body = 'Invalid Signature';
      }
    } else if (that.method === 'GET') {
      console.log('inside posting...');
      if (sha !== signature) {
        that.body = 'wrong';
        return false;
      }
      console.log(that);
      const data = await getRowBody(that.req, {
        length: that.req.headers['content-length'],
        limit: '1mb',
        encoding: contentType.parse(that.req).parameters.charset,
      });

      const content = await util.parseXMLAsync(data);
      const message = await util.formatMessage(content.xml);

      that.weixin = message;
      await weixin.reply.call(that);

      wechat.reply.call(that);
    }
  }
}

module.exports = WechatController;
