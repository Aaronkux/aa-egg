const Service = require("egg").Service

function transferData(data) {
  if (Object.prototype.toString.call(data) === '[object Object]') {
    for (let index in data) {
      data[index] = transferData(data[index])
    }
    return data
  }
  else if (Object.prototype.toString.call(data) === '[object Array]') {
    return Object.fromEntries(data.map(item => [item.id, transferData(item)]))
  }
  else {
    return data
  }
}

const profitLevel = {
  1: {
    0: { 0: 0.3, 1: 0.1, 2: -0.1, 3: -0.15, 4: -0.35 },
    1: { 0: 0.3, 1: 0.1, 2: -0.1, 3: -0.15, 4: -0.35 },
  },
  2: {
    0: { 0: 0.15, 1: 0.05, 2: -0.07, 3: -0.12, 4: -0.35 },
    1: { 0: 0.15, 1: 0.05, 2: -0.07, 3: -0.12, 4: -0.35 },
  },
  3: {
    0: { 0: 0.05, 1: 0.02, 2: -0.05, 3: -0.1, 4: -0.35 },
    1: { 0: 0.05, 1: 0.02, 2: -0.05, 3: -0.1, 4: -0.35 },
  },
  4: {
    0: { 0: 0.03, 1: 0.01, 2: -0.04, 3: -0.08, 4: -0.35 },
    1: { 0: 0.03, 1: 0.01, 2: -0.04, 3: -0.08, 4: -0.35 },
  },
}

class TradeService extends Service {
  async findAll(serverId) {
    const server = await this.ctx.model.Server.findByPk(serverId)
    if (server === null) this.ctx.throw(422, "target server not find")
    // const continents = await server
    //   .getContinents({
    //     attributes: ["id", "name"],
    //     include: [
    //       {
    //         model: this.ctx.model.Area,
    //         as: "areas",
    //         attributes: ["id", 'name', 'warArea'],
    //       },
    //     ],
    //   })
    //   .then((continents) => {
    //     JSON.parse(JSON.stringify(continents)).forEach((continent) => {
    //       continent.areas = continent.areas.map((area) => area.id)
    //       res.continents[continent.id] = continent
    //     })

    //   })
    // return res

    const resRaw = await server.getContinents({
      attributes: ["id", "name"],
      include: [
        {
          model: this.ctx.model.Area,
          as: "areas",
          attributes: ["id", "name", "warArea"],
          include: [
            {
              model: this.ctx.model.Pack,
              as: "packs",
              attributes: [
                "id",
                ["id", "key"],
                "origin",
                "level",
                "normal",
                "glida",
                "local",
                "fertilizer",
                "salve",
                "cheese",
                "honey",
                "bluesalt",
                "special",
                "antiquities",
                "order"
              ],
            },
          ],
        },
      ],
    })
    let resNow = JSON.parse(JSON.stringify(resRaw))
    
    return { continents: transferData(resNow), profitLevel }
  }

  // async
}
module.exports = TradeService
