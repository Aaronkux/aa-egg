module.exports = (app) => {
  const { STRING, INTEGER, FLOAT } = app.Sequelize

  const Pack = app.model.define("pack", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    origin: STRING,
    level: INTEGER,
    normal: FLOAT,
    glida: FLOAT,
    local: FLOAT,
    fertilizer: FLOAT,
    salve: FLOAT,
    cheese: FLOAT,
    honey: FLOAT,
    bluesalt: FLOAT,
    special: FLOAT,
    antiquities: FLOAT,
    order: INTEGER
  })
  Pack.associate = function () {
    app.model.Pack.belongsTo(app.model.Area)
  }

  return Pack
}
