'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller } = app;
  app.all('/wechat', controller.home.wechat);
};
