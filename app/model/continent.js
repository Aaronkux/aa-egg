module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Continent = app.model.define('continent', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
  });
  Continent.associate = function() {
    Continent.Area = app.model.Continent.hasMany(app.model.Area);
    app.model.Continent.belongsTo(app.model.Server);
  };

  return Continent
}