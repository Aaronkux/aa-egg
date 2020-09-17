const Controller = require('egg').Controller;

class ScheduleController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.schedule.findAll(ctx.params.serverId);
  }
}

module.exports = ScheduleController