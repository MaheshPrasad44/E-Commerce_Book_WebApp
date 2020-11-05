const Sequelize = require('sequelize');
const db = require('../config/database')




module.exports = (sequelize, Sequelize) => {
const Cart = sequelize.define('Cart',{

    bookId:{
        type:Sequelize.INTEGER
    },
    title:{
        type:Sequelize.STRING
    },
    sellerId:{
        type:Sequelize.INTEGER
    },
    price:{
        type:Sequelize.DOUBLE
    },
    addedQuantity:{
        type:Sequelize.INTEGER
    },
    buyerId:{
        type:Sequelize.DOUBLE
    }
},
{
    freezeTableName: true
});
 return Cart;
}




