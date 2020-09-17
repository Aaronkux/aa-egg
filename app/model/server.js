module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Server = app.model.define('server', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING, //sea, cn
    version: STRING, //6.1.9 6.5
  });

  Server.associate = function() {
    Server.Activity = app.model.Server.hasMany(app.model.Activity);
    Server.Continent = app.model.Server.hasMany(app.model.Continent);
  };

  return Server
}