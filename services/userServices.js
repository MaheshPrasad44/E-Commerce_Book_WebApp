const db= require('../config/database')
const User = db.users;
var bcrypt = require('bcryptjs');

exports.add_User= (reqBody)=>{
    let password = reqBody.password;
    let hashPassword = bcrypt.hashSync(password, 10);
    reqBody.password = hashPassword;
    let promise= User.create(reqBody)
      return promise;
}

exports.get_UserData=()=>{
     let promise = User.findAll(
        {
            attributes:['id','password','userName','firstName','lastName']
        }
    )
    return promise;
}



exports.checkDuplicateUserName =  (req)=>{
  let user =  User.count({ where: { userName: req.body.userName } });
  console.log(" user details" + user)
  return user;
 
 }


exports.get_UserSpecificData=(req)=>{
  //console.log("passport" + req.session.passport.user)
  let promise = User.findOne({ where: { id: req.session.passport.user } });
 return promise;
}
exports.update_User = (req,request)=>{
  let hashPassword = bcrypt.hashSync(request.password, 10);
  let promise =   User.update({firstName: request.firstName, lastName: request.lastName, userType:request.userType, password: hashPassword}, {
        where: {
          id:  req.session.passport.user
        }
      })
      return promise;
}
exports.login_User =  (req)=>{
 let user =  User.findOne({ where: { userName: req.body.userName } });
 console.log(" user details" + user)
 return user;

}