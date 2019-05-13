module.exports = (sequelize, DataTypes) => (
  sequelize.define('pushLog', {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    success: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    failure: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    }
  }, {
      timestamps: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    })
);