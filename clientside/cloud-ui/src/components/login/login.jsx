import React,{ Component } from "react";

import  * as ax  from '../../API/api';
import './login.css';
class Login extends Component{

    state={
       jwttoken:"",
       auth_state:"",
       username:"",
       password:""
    };


    componentDidMount(){

    }

    forgot_passport(e){
      
      e.preventDefault();
      let obj={};
    
      let username=document.getElementById("username").value;
      if(username ==""){
          alert("Please enter the email");
          return;
      }  
      obj.userName=username;
      ax.forgotpassport_api(obj).then((res)=>{
          if(res!=undefined){
            if(res.status=="200"){
              alert(" Email  sent succesfully "); 
            }
          }
          else{
            alert(" Something went wrong ...try again "); 
          }
      })

    }

    authenticate_user(e){
      e.preventDefault();
    
      let username=document.getElementById("username").value;
      let password=document.getElementById("password").value;
      if(username =="" || password ==""){
          alert("Please enter the values");
          return;
      }
      ax.login(username,password).then((res)=>{
        let payload = res.data;
        if(res.status =="200"){
          sessionStorage.setItem('userId',res.data.userId.user);
          alert("Login success  " + payload.msg); 
          window.location.href= "/profile"
        }
        else{
          alert( "User Login Failed :    " + res.data.msg);
        }
     console.log(payload)
      })
      
    }

    logout(e){
      e.preventDefault();
      
    }
    


    render(){
return(
    <div className="loogin">
      
<div  id="UserLogin" className="login">
          <form>
            <h3> User Login</h3>
            <div>
            <label htmlFor="email">Email</label>
              <input type="text" maxLength="50" id="username" required />
              
            </div>
            <div><label htmlFor="password">Password</label>
              <input type="password" maxLength="20" id="password" required />
              
            </div>
            <button class="btn btn-info" onClick={(e)=>{this.authenticate_user(e)}}>Login</button>
<br/>
            {/* <button class="btn btn-info" onClick={(e)=>{this.forgot_passport(e)}}>Forgot Password</button>
             */}
            <a href="/reset">Forgot password</a>
          <br/>
          <br/>
          <br/>
            <a href="/signup">Don't have an account</a>
          </form>
        </div>
      
    </div>
    
)
    }
}




export default Login;