const Sequelize = require('sequelize');
var sequelize;
//database wide options
var opts = {
  define: {
      //prevent sequelize from pluralizing table names
      freezeTableName: true
  }
}
if(process.env.ENVIRONMENT ==="prod"){

  sequelize=  new Sequelize(process.env.RDS_DATABASENAME, process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
    host: process.env.RDS_HOSTNAME,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });
}
else{
  
  sequelize=  new Sequelize('cloudDB', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });
}


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.images = require("../models/Image.js")(sequelize, Sequelize);
db.authors = require("../models/Author.js")(sequelize, Sequelize);
db.books = require("../models/Book.js")(sequelize, Sequelize);
db.users = require("../models/User.js")(sequelize, Sequelize);
db.cart = require("../models/Cart.js")(sequelize, Sequelize);
db.books.hasMany(db.authors, { as: "authors" });
db.authors.belongsTo(db.books);

module.exports = db;