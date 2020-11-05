import React,{ Component } from "react";

import  * as ax  from '../../API/api';
class Logout extends React.Component {
    
componentWillMount(){
    ax.log_out().then((payload)=>{
        sessionStorage.setItem('userId',"");
        console.log("log out success")
        window.location.href= "/login"
      })
}

    render() {
      return <h1>Successfully logged out</h1>;
    }
  }

  export default Logout;