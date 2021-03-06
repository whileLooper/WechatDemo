'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.verb('/', controller.home.index);
  router.get('/', controller.wechat.index);
  router.post('/', controller.wechat.index);
  router.get('/wechat', controller.wechat.index);
  router.post('/wechat', controller.wechat.index);
  router.get('/admin', controller.admin.render);
};
