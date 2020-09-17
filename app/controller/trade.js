const Controller = require('egg').Controller;

class TradeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.trade.findAll(ctx.params.serverId);
  }
}

module.exports = TradeController