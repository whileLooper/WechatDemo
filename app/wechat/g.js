'use strict';
var sha1 = require('sha1');
var getRowBody = require('raw-body');
var Wechat = require('./wechat');
var util = require('./util');

module.exports = function (opts, handler, ctx) {
  var wechat = new Wechat(opts);
  return function* (next) {
    var that = ctx;
    var token = opts.token;
    var signature = that.query.signature;
    var nonce = that.query.nonce;
    var timestamp = that.query.timestamp;
    var echostr = that.query.echostr;
    var str = [token, timestamp, nonce].sort().join('');
    var sha = sha1(str);

    if (that.method === 'GET') {
      if (sha === signature) {
        that.body = echostr + '';
      } else {
        that.body = 'Invalid Signature';
      }
    } else if (that.method === 'POST') {
      if (sha !== signature) {
        that.body = 'wrong';
        return false;
      }

      var data = yield getRowBody(that.req, {
        length: that.length,
        limit: '1mb',
        encoding: that.charset
      });

      var content = yield util.parseXMLAsync(data);
      var message = yield util.formatMessage(content.xml);
      console.log(message);

      that.weixin = message;
      yield handler.call(that, next);

      wechat.reply.call(that);
    }
  }
}