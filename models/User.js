const Sequelize = require('sequelize');
const db = require('../config/database')


module.exports = (sequelize, Sequelize) => {
const User = sequelize.define('User',{

    // userId:{
    //     type:Sequelize.INTEGER,
    //     primaryKey: true
    // },
    
    userName:{
        type:Sequelize.STRING
    },
    userType:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    firstName:{
        type:Sequelize.STRING
    },
    lastName:{
        type:Sequelize.STRING
    }
},
{
    timestamps: false,
    freezeTableName: true
}
);

return User;
}
