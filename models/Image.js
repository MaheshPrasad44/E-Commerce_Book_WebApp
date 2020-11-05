const Sequelize = require('sequelize');
const db = require('../config/database')



module.exports = (sequelize, Sequelize) => {
const Image = sequelize.define('Image',{

   
    imageName:{
        type:Sequelize.STRING
    },
    bookId:{
        type:Sequelize.INTEGER
    }

  
},
{   
    timestamps: false,
    freezeTableName: true
});

return Image;

}
