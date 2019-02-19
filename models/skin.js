// module.exports = (sequelize, DataTypes) => {
//         const skin = sequelize.define('skin', {
//           nameOfSkin: {
//             type: DataTypes.STRING,
//             allowNull: false
//           }, 
//           baseOfSkin: {
//             type: DataTypes.STRING,
//             allowNull: false
//           }, 
//           type: {
//             type: DataTypes.STRING,
//             allowNull: false
//           },
//         })
      
//         return log;
//       }
module.exports = (sequelize, DataTypes) => {
  const Skin = sequelize.define ('skin', {
    cleanser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    exfoliant: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    moisturizer: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true 
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false 
    }
  })

  return Skin;
  ;
}
//Skin model 
//cleanser
// exfoliant 
// moisterizer
// result