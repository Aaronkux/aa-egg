const Service = require("egg").Service

class AdminService extends Service {
  async createServer({ name, version }) {
    await this.ctx.model.Server.create({ name, version })
  }

  async createActivity({
    title,
    titleBackgroundColor,
    inProgressBackgroundColor,
    icon,
    serverId,
  }) {
    const server = await this.ctx.model.Server.findByPk(serverId)
    if (server === null) this.ctx.throw(422, "target server not find")
    const activity = await server.createActivity({
      title,
      titleBackgroundColor,
      inProgressBackgroundColor,
      icon,
    })
    return activity
  }

  async createEvent({ name, icon, activityId }) {
    const activity = await this.ctx.model.Activity.findByPk(activityId)
    if (activity === null) this.ctx.throw(422, "target activity not find")
    const event = await activity.createEvent({ name, icon })
    return event
  }

  async createTime({ day, hours, minutes, seconds, eventId }) {
    const event = await this.ctx.model.Event.findByPk(eventId)
    if (event === null) this.ctx.throw(422, "target event not find")
    const time = await event.createTime({ day, hours, minutes, seconds })
    return time
  }
}

module.exports = AdminService
