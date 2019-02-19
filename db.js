const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres'
})

sequelize.authenticate()
.then(() => console.log('postgres db is connected'))
.catch(err => console.log(err))

//    function(){
        //console.log('Connected to skinlog postgres database');
   // }, 
   // function(err){
   //     console.log(err);
  //  }
//)

module.exports = sequelize;