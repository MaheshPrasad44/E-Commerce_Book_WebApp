import React,{ Component } from "react";
import  * as ax  from '../../API/api';
import './register.css';
class Register extends Component{

    state={
      toggle:false,
       userName:"",
       password:"",
       userId:"",
       firstName:"",
       lastName:"",
       location:"",
       phone:"",
       walletAmount:"",
       role:""
    };

    register_user(e){
      e.preventDefault();
        let user ={
        };
      user.userName=document.getElementById("userName").value;
      user.userType=document.getElementById("userType").value;
      user.password=document.getElementById("password1").value;
      user.firstName=document.getElementById("firstName").value;
      user.lastName=document.getElementById("lastName").value;
      if(  user.userName =="" ||  user.lastName=="" ||  user.firstName=="" ||  user.password=="" ){
        alert("Please enter all the fields")
        return;
      }

if(document.getElementById("password1").value == document.getElementById("password2").value){
  ax.registerUser(user).then((res)=>{
    let payload = res.data;

    if(res.status =="200"){

      alert("User register success  ");
      window.location.href ="/login";
    }
    else if(res.status == "400"){
      alert( "Password Criteria mismatch  " + res.data.msg);
    }
    else {
      alert( "User Register Fail  " + res.data.msg);
    }
    
console.log(payload)
})
}
else{
alert("Password does not match... Please enter the password again");
}
}

    render(){
return(
    <div className="reg_sec">
      
        
        <div className="signup">
                    <div id="UserRegistration">
                    <h3>Register as User</h3>
                      <form>
                      <div><label htmlFor="userName">Email</label>
                          <input type="text" name="userName" id="userName" required />
                          
                        </div>
                        <div><label htmlFor="password1">Password</label>
                          <input type="password" name="password1" id="password1" required />
                          
                        </div>
                        <div> <label htmlFor="password2">Confirm Password</label>
                          <input type="password" name="password2" id="password2" required />
                         
                        </div>
                        <div> <label htmlFor="firstName">First Name</label>
                          <input type="text" name="firstName"  id="firstName" required />
                        </div>
                        <div><label htmlFor="lastName">Last Name</label>
                          <input type="text" name="lastName" id="lastName" required />
                        </div>
                        <div><label htmlFor="lastName">Type</label>
                         <select id="userType">
                           <option value="Buyer">Buyer</option>
                           <option value="Seller">Seller</option>
                           <option value="Both">Both</option>
                         </select>
                        </div>
                  
                        <button class="btn btn-info switch"  onClick={(e)=>{this.register_user(e)}}>Sign Up</button>
                        <a href="/login">Already have an account</a>
                      </form>
                </div>
                </div>
         
      
    </div>
    
)
    }
}



export default Register;