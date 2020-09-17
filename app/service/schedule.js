const Service = require("egg").Service

// const position = {
//   1: [["2", "1"]],
//   2: [["1"], ["2"]],
//   3: [["1"], ["2"], []],
// }
const position = {
  1: [["2", "1", "3"]],
  2: [["1"], ["2", "3"]],
  3: [["1"], ["2"], ["3"]],
}

class ScheduleService extends Service {
  async findAll(serverId) {
    const server = await this.ctx.model.Server.findByPk(serverId)
    if (server === null) this.ctx.throw(422, "target server not find")
    const resRaw = await server.getActivities({
      attributes: [
        "id",
        "title",
        "titleBackgroundColor",
        "inProgressBackgroundColor",
        "icon",
      ],
      include: [
        {
          model: this.ctx.model.Event,
          as: "events",
          attributes: ["id", "name", "icon"],
          include: [
            {
              model: this.ctx.model.Time,
              as: "times",
              attributes: ["id", "day", "hours", "minutes", "seconds", "last"],
            },
          ],
        },
      ],
      // raw: true,
      // plain: true,
      // nest: true,
    })
    return {
      activities: resRaw,
      position,
    }
  }

  // async
}
module.exports = ScheduleService
