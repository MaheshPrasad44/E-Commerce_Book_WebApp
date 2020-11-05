const Sequelize = require('sequelize');
const db = require('../config/database')



module.exports = (sequelize, Sequelize) => {
const Author = sequelize.define('Author',{

   
    authorName:{
        type:Sequelize.STRING
    }
  
},
{   
    timestamps: false,
    freezeTableName: true
});

return Author;

}
