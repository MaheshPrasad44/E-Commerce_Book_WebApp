
import React,{ Component } from "react";
import  * as ax  from '../../API/api';
class Home extends React.Component {
state={
    data:""
}
    componentWillMount(){
ax.getuserdata().then((res)=>{
if(res.status == 200){
    let payload = res.data; 
 alert("User Data loaded")
}
else{
alert(res.data.msg)
window.location.href= "/login"
}
})
    }

    render() {
      return <div>
          <h1>Hello, This is Home</h1>
    <div>{this.state.data}</div>
          </div>
    }
  }

  export default Home;