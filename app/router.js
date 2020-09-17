'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const apiPrefix = '/api/v1'
  router.get('/', controller.home.index);
  router.get(`${apiPrefix}/schedule/:serverId`, controller.schedule.index);
  router.get(`${apiPrefix}/trade/:serverId`, controller.trade.index);
};
