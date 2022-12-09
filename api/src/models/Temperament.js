const { DataTypes } = require("sequelize");
// Exporto una función que define el modelo
// Luego le injecto la conexión a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("temperament", {
    name: {
      type: DataTypes.STRING,
    },
  });
};