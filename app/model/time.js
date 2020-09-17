module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const Time = app.model.define('time', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    day: INTEGER,
    hours: INTEGER,
    minutes: INTEGER,
    seconds: INTEGER,
    last: INTEGER,
  });

  Time.associate = function() {
    app.model.Time.belongsTo(app.model.Event)
  }

  // Time.findByLogin = async function(login) {
  //   return await this.findOne({
  //     where: {
  //       login: login
  //     }
  //   });
  // }

  // don't use arraw function
  // User.prototype.logSignin = async function() {
  //   return await this.update({ last_sign_in_at: new Date() });
  // }

  return Time;
};