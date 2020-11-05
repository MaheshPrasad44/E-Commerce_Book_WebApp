const userServices= require('../services/userServices')
var bcrypt = require('bcryptjs');
const passport = require('passport')

const logger = require('./winstonLogger');
const statsClient = require('statsd-client');
const statsd = new statsClient({host: 'localhost', port: 8125});
var passwordValidator = require('password-validator');
 
// Create a schema
var schema = new passwordValidator();
 
// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(25)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
 

exports.getuserdata = (req,res)=>{
   var timer = new Date();
   userServices.get_UserData()
   .then((user)=>{
      statsd.increment('GET User Data');
      logger.info(" got user data succesfully");
    res.status(200);
    res.json({
       user
    })
    statsd.timing('User Data Time', timer);
   })
   .catch((err)=>{
      logger.info(" something went wrong in obtaining user data");
      res.status(500);
      res.json({
         msg:"Something went wrong please try again  "
      })
      
  })

}
exports.getUserSpecificData = (req,res)=>{
   var timer = new Date();
   userServices.get_UserSpecificData(req)
   .then((user)=>{
      statsd.increment('GET User Specific Data');
      logger.info(" got user specific data succesfully");
    res.status(200);
    res.json({
       user
    })
    statsd.timing('User Specific Data Time', timer);
   })
   .catch((err)=>{
      logger.info(" something went wrong in obtaining user specific data");
      res.status(500);
      res.json({
         msg:"Something went wrong please try again  "
      })
  })

}
exports.loginUser = (req,res) =>{
   var timer = new Date();
   userServices.login_User(req)
   .then((user)=>{
      console.log("success user details" + user.userName + user.password )
      if(user  && bcrypt.compareSync(req.body.password, user.password))
       {
              console.log("login success")
              
      
              req.login(user.id, function(err){
               logger.info(" login successful");
               statsd.increment(' timing Login Successful');
               console.log("inside login")
               res.status(200);
               res.json({
                  msg: "login Successful",
                  userId:req.session.passport
               })
               statsd.timing('Login  Time', timer);
              })
             
     }
   else{
      console.log("login  err  user details" )
      statsd.increment(' Login Failed');
      logger.info(" login failed ");
      res.status(401);
      res.json({
         msg: "Login Failed. Password Mismatch"
      })
   }
})
.catch((err)=>{

   logger.info("Userrrrrrrrrrrrrrr  " + req.body.userName);
   logger.info("User is not in the database... Please Register  " + err);
   res.status(500);
   res.json({
      msg: "User is not in the database... Please Register "+ err +" ..."
   })
})
}
exports.addUser= (req,res)=>{
   var timer = new Date();
   if(schema.validate(req.body.password)){

      userServices.checkDuplicateUserName(req)
      .then((count)=>{
         if(count>0){
            
   logger.info("UserName or email already exists... Please choose another e-mail ");
            res.status(500);
            res.json({
               msg:"UserName or email already exists... Please choose another e-mail"
            })
            return;
         }
         else{
            userServices.add_User(req.body)
            .then((user)=>{
               statsd.increment('User added successful');
   logger.info(" Added user succesfully ");
               res.status(200);
               res.json({
                  user
               })
               statsd.timing('Add User  Time', timer);
            })
            .catch((err)=>{
               
   logger.info(" Failed to add the User... Please try again");
               res.status(500);
               res.json({
                  msg:"Failed to add the User... Please try again"
               })
               })
         }
      })
               
   }
   else{

   logger.info(" Password must have minimum 8 characters, must have digit, Upper case , lower case, and no spaces and maximum of 25 characters ");
      res.status(400);
      res.json({
         msg:"Password must have minimum 8 characters, must have digit, Upper case , lower case, and no spaces and maximum of 25 characters "
      })
   }
   
    
}
exports.updateUser= (req,res)=>{
   var timer = new Date();
   if(schema.validate(req.body.password)){

    let request = req.body
    userServices.update_User(req,request)
    .then((user)=>{
      statsd.increment('Updated User successfully');
   logger.info("Updated User successfully");
     
      res.status(200);
      res.json({
         user
      })
      statsd.timing('Update user time ', timer);
    })
    .catch((err)=>{

   logger.info("Updated User failed ");
      res.status(500);
      res.json({
         msg:"Failed to update the user "
      })
    })

   }
   else{

   logger.info(" Password must have minimum 8 characters, must have digit, Upper case , lower case, and no spaces and maximum of 25 characters ");
      res.status(400);
      res.json({
         msg:"Password must have minimum 8 characters, must have digit, Upper case , lower case, and no spaces and maximum of 25 characters "
      })
   }

}

passport.serializeUser(function(id, done) {
   done(null, id);
 });
 
 passport.deserializeUser(function(id, done) {
   done(null, id);
 });

