'use strict';
/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  // 将 get/post 请求都转给 home.wechat
  app.all('/wechat', 'wechat.index');
};