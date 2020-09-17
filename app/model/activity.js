module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Activity = app.model.define('activity', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING,
    titleBackgroundColor: STRING,
    inProgressBackgroundColor: STRING,
    icon: STRING
  });
  Activity.associate = function() {
    Activity.Event = app.model.Activity.hasMany(app.model.Event);
    app.model.Activity.belongsTo(app.model.Server);
  };

  return Activity
}