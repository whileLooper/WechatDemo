// app/service/user.js
const Service = require('egg').Service;

class WechatService extends Service {
  async returnGood(uid) {
    return 'good';
  }
}

module.exports = WechatService;
