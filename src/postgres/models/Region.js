module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Region', {
    regionId: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    }, 
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
      tableName: 'Regions',
      timestamps: true
    });
}
