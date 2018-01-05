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
    this.ctx.body = 'hi, wechat';
    this.app.use(wechat(this.config.wechatConfig).middleware(async (message, ctx) => {
      // 微信输入信息就是这个 message
      if (message.FromUserName === 'diaosi') {
        // 回复屌丝(普通回复)
        return 'hehe';
      } else if (message.FromUserName === 'text') {
        //你也可以这样回复text类型的信息
        return {
          content: 'text object',
          type: 'text'
        };
      } else if (message.FromUserName === 'hehe') {
        // 回复一段音乐
        return {
          type: "music",
          content: {
            title: "来段音乐吧",
            description: "一无所有",
            musicUrl: "http://mp3.com/xx.mp3",
            hqMusicUrl: "http://mp3.com/xx.mp3"
          }
        };
      } else if (message.FromUserName === 'kf') {
        // 转发到客服接口
        return {
          type: "customerService",
          kfAccount: "test1@test"
        };
      } else {
        // 回复高富帅(图文回复)
        return [
          {
            title: '你来我家接我吧',
            description: '这是女神与高富帅之间的对话',
            picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
            url: 'http://nodeapi.cloudfoundry.com/'
          }
        ];
      }
    }));
  }
}

module.exports = WechatController;
