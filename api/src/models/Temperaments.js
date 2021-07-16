const { DataTypes } = require('sequelize');


// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Temperaments = sequelize.define('temperaments', {
    id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
  });
  return Temperaments;
};
