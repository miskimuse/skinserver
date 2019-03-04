module.exports = (sequelize, DataTypes) => {
  const Skin = sequelize.define ('skin', {
    cleanser: {
      type: DataTypes.STRING,
      allowNull: true
    },
    exfoliant: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    moisturizer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    result: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    owner: DataTypes.INTEGER
    
  })

  return Skin;
  ;
}
//Skin model 
//cleanser
// exfoliant 
// moisterizer
// result