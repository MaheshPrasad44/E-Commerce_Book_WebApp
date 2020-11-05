
import React,{ Component } from "react";
import  * as ax  from '../../API/api';
import { Collapse } from "react-bootstrap";
class Mycart extends React.Component {
state={
    cartitems:"",
    vaildbookId:[]
}

    componentWillMount(){
ax.get_myCartItems().then((res)=>{
if(res.status == 200){
    let payload = res.data.data;
    console.log(payload)
    let validId=[];
    let count=0;
   
    var arrlength= Object.values(res.data.cartitems).length;
    
    Object.values(res.data.cartitems).map((e)=>{

        count++;
        let book={}
        book.bookId = e.bookId;
        ax.checkItemExist_Book(book)
        .then((ress)=>{
        if(ress.status == 200){
               console.log(ress.data)
               if(res.data != undefined || ress.data != "" || ress.data != null ){
                   if(ress.data.result>0){
                      
                      
                       validId.push(e.bookId)
                       if(count == arrlength){
                        alert("Cart loaded")
                        this.setState({cartitems : res.data.cartitems, vaildbookId: validId}); 
                       }
                    
                   }
                   else{
                       return false;
                   }
               }
            }
            else{
            alert(res.data.msg)
            window.location.href= "/profile"
            }

        })
    })
    console.log(validId)
   
 
}
else{
alert(res.data.msg)
window.location.href= "/profile"
}
})
    }
    checkItemExist(bookId){
        let book={

        }
      
        book.bookId = bookId;
        ax.checkItemExist_Book(book)
        .then((res)=>{
        if(res.status == 200){
               console.log(res.data)
               if(res.data != undefined || res.data != "" || res.data != null ){
                   if(res.data.result>0){
                       return true;
                   }
                   else{
                       return false;
                   }
               }
            }
            else{
            alert(res.data.msg)
            //window.location.href= "/login"
            }

        })

    }
    update_CartItem(e){
        console.log(e);
        let cart = {}
        cart.bookId=e.target.parentElement.parentElement.id;
        cart.quantity= e.target.parentElement.parentElement.children[3].innerText;
        cart.new= e.target.parentElement.parentElement.children[2].children[0].value;
        ax.updateCart(cart)
        .then((res)=>{

            if(res.status == 200){
                let payload = res.data.data;
                console.log(payload)
             alert("Updated Cart Successfully")
             window.location.href = "/mycart"
            }
            else{
            alert(res.data.msg)
            //window.location.href= "/login"
            }

        })
    
    }


    render() {
      return <div>
          <h1>My Cart</h1>
          <div className="row" ><div className="col-md-2"><b>Title</b></div><div className="col-md-2"><b>Price</b></div><div className="col-md-2"><b>Quantity</b></div><div className="col-md-2"></div><div className="col-md-2"></div></div>
              
          {
               Object.values(this.state.cartitems).map((e)=>{
                return    <div>
                <div className="row" id={e.bookId}><div className="col-md-2">{e.title}</div><div className="col-md-2">{e.price}</div><div className="col-md-2"><input type="number" step="1" pattern="[0-9]" title="Numbers only" placeholder={e.addedQuantity}></input></div><div style={{display:"none"}}>{e.addedQuantity}</div><div className="col-md-2">
                    { 
                    (this.state.vaildbookId).indexOf(e.bookId) ==-1
                        ? 

                        <div>Sorry Item not available</div>
                      
                        : 
                        <button onClick={(e)=>{this.update_CartItem(e)}}>Update</button>
                    }
                   
                    
                    </div></div>
             </div>   
          })
        }
          </div>
    }
  }

  export default Mycart;