module.exports = (sequelize, DataTypes) => (
  sequelize.define('device', {
    uuid: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    registerKey: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    platform: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  }, {
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    })
);