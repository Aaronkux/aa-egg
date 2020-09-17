module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const Area = app.model.define('area', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    warArea: BOOLEAN,
  });
  Area.associate = function() {
    Area.Pack = app.model.Area.hasMany(app.model.Pack);
    app.model.Area.belongsTo(app.model.Continent);
  };

  return Area
}