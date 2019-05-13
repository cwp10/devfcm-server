const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Device = require('./device')(sequelize, Sequelize);
db.PushLog = require('./pushLog')(sequelize, Sequelize);

module.exports = db;