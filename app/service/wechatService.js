// app/service/user.js
const Service = require('egg').Service;

class WechatService extends Service {
  async returnGood(uid) {
    return this.ctx.body = 'good';
  }
}

module.exports = WechatService;
