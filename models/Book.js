const Sequelize = require('sequelize');
const db = require('../config/database')
const Author = require('./Author')



module.exports = (sequelize, Sequelize) => {
const Book = sequelize.define('Book',{

    // bookId:{
    //     type:Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true
    // },

    ISBN:{
        type:Sequelize.STRING
    },
    title:{
        type:Sequelize.STRING
    },
    imageName:{
        type:Sequelize.STRING
    },
    sellerId:{
        type:Sequelize.INTEGER
    },
    publicationDate:{   
        type:Sequelize.DATE
    },
    quantity:{
        type:Sequelize.INTEGER
    },
    price:{
        type:Sequelize.DOUBLE
    }
},
{
    freezeTableName: true
});
 return Book;
}




