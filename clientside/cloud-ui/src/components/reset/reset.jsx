import React,{ Component } from "react";
import  * as ax  from '../../API/api';

class Reset extends Component{

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
              alert(" Email sent succesfully..if you are requesting within 15 minutes "); 
            }
            else if(res.status=="500"){
              alert(" something went wrong... "+ res.data.msg); 
            }
            else{
              alert("something went wrong during the process "); 
            }
          }
         
      })

    }

    render(){
return(
    <div className="loogin">
      
<div  id="UserLogin" className="login">
          <form>
            <h3> Password reset form</h3>
            <div>
            <label htmlFor="email">Email</label>
              <input type="text" maxLength="50" id="username" required />
              
            </div>
            <button class="btn btn-info" onClick={(e)=>{this.forgot_passport(e)}}>Forgot Password</button>
        
          </form>
        </div>
      
    </div>
    
)
    }
}




export default Reset;
