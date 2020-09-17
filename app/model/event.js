module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Event = app.model.define('event', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    icon: STRING,
  });

  Event.associate = function() {
    Event.Time = app.model.Event.hasMany(app.model.Time);
    app.model.Event.belongsTo(app.model.Activity);
  };
  return Event
}