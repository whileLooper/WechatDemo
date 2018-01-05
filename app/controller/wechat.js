'use strict';

const Controller = require('egg').Controller;
const wechat = require('co-wechat');

// module.exports = app => {
//   class WechatController extends app.Controller {}

//   // 因为 Egg 需要用类的形式来组织，而 wechat 是通过 middleware 方法来生成中间件
//   WechatController.prototype.index = wechat(app.config.wechatConfig).middleware( () => {
//     app.service.wechatService.good();
//   });

//   return WechatController;
// };

class WechatController extends Controller {
  async index() {
    this.ctx.app.use(
      wechat(this.app.config.wechatConfig).middleware( () => {
        this.app.service.wechatService.good();
      })
    );
  }
}

module.exports = WechatController;