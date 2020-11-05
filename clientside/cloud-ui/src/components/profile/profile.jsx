import React,{ Component } from "react";
import  * as ax  from '../../API/api';
import './profile.css'
class Profile extends React.Component {
    state = {
     firstName:"",
     lastName:"",
     password:"",
     userType:""
    }
  componentDidMount(){
    ax.getUserSpecificData().then((res)=>{
    if(res.status == 200){
        let payload = res.data; 
     
       // this.state.user = payload;
     alert("User Data loaded")
     this.setState({firstName: res.data.user.firstName,lastName: res.data.user.lastName, password: res.data.user.password,  userType: res.data.user.userType});
    }
    else{
    alert(res.data.msg)
    window.location.href= "/login"
    }
    })
        }

        update_user(e){
          e.preventDefault();
          let user ={
          };
          if(document.getElementById("password1").value !=""){
            user.password=document.getElementById("password1").value;
          }
          if(document.getElementById("firstName").value !=""){
            user.firstName=document.getElementById("firstName").value;
          }
          if(document.getElementById("lastName").value){
            user.lastName=document.getElementById("lastName").value;
          }
          if(document.getElementById("userType").value !=""){
            user.userType=document.getElementById("userType").value;
          }
      
          ax.updateUser(user).then((res)=>{
            if(res.status == 200){
                let payload = res.data; 
             
               // this.state.user = payload;
             alert("Updated User Information Successfully")
            // this.setState({firstName: res.data.user.firstName,lastName: res.data.user.lastName, password: res.data.user.password});
           window.location.href="/profile" 
            }
            else if(res.status == "400"){
              alert( "Password Criteria mismatch  " + res.data.msg);
            }
            else{
            alert(res.data.msg)
            window.location.href= "/login"
            }
            })
        } 
        toggle_tab(){
          if(document.getElementById("update_section").style.display!= "none"){
            document.getElementById("update_section").style.display= "block"
            document.getElementById("info_Section").style.display= "none"
          }
          else{
            document.getElementById("info_Section").style.display= "block"
            document.getElementById("update_section").style.display= "none"
          }
        }

    render() {
      return(

        <div>
        <h1>Update Profile</h1>
        <div id="info_Section"><div className="container">
      <div className="row"><div className="col-md-3">First Name</div><div>{this.state.firstName}</div></div>
        
      <div className="row"><div className="col-md-3">Last Name</div><div>{this.state.lastName}</div></div>

      <div className="row"><div className="col-md-3">Type</div><div>{this.state.userType}</div></div>
        
      <div className="row"><div className="col-md-3">Password</div><input type="password" value={this.state.password} disabled />
      
      </div>
      </div>
      <button  class="btn btn-info switch"  onClick={(e)=>{this.toggle_tab(e)}}>Update User Information</button>
        </div>
        <div id="update_section">
        <form>
                        <div><span> <label htmlFor="firstName">First Name</label>
                          <input type="text" name="firstName"  id="firstName" required />
                          </span>
                        </div>
                        <div><label htmlFor="lastName">Last Name</label>
                          <input type="text" name="lastName" id="lastName" required />
                          
                        </div>

                        <div><label htmlFor="password1">Password</label>
                          <input type="password" name="password1" id="password1" required />
                          
                        </div>
                
                        <div><label htmlFor="lastName">Type</label>
                         <select id="userType">
                           <option value="Buyer">Buyer</option>
                           <option value="Seller">Seller</option>
                           <option value="Both">Both</option>
                         </select>
                        </div>
                        <button class="btn btn-info switch"  onClick={(e)=>{this.update_user(e)}}>Update user</button>
                       
        </form>
        </div>
              </div> 
            
      )}
  }

  export default Profile;