const express = require('express')
const port = process.env.port || 8080;
const cors = require('cors');
const publicIp = require('public-ip');
const app = express();
console.log("starting express")
const {initApp}  = require('./route');
const bodyParser = require('body-parser');
const passport = require('passport')
var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();
const db = require("./config/database");
db.sequelize.sync();
var options;

var os = require("os");
var hostname;

if(process.env.ENVIRONMENT!="prod"){
  hostname="localhost"
}
else{
  (async () => {
    hostname = await publicIp.v4();
  })();
}


if(process.env.ENVIRONMENT ==="prod"){
  options = {
    host: process.env.MySQL_HOST,
    port: 3306,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASENAME
  };
}
else{
  options = {
    host: process.env.MySQL_HOST,
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'cloudDB'
  };
}
 

var sessionStore = new MySQLStore(options);


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'secretkeyy',
  resave: false,
  store: sessionStore,
  saveUninitialized: false,
  httpOnly: false
  //cookie: { httpOnly: false, maxAge: 60*60 }
}))
app.use(passport.initialize());
app.use(passport.session());
//app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://prod.mahesh-prasad.site");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

initApp(app);


//const db = require('./config/database')

// db.authenticate()
//   .then(() => {
//     console.log('ORM Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });



app.listen(port);
console.log('Entity RESTful-API server  new started on: ' + port);
module.exports= app;