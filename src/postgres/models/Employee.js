module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Employee', {
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    surname: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    regionId: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
      tableName: 'Employee',
      timestamps: true
    });
}
