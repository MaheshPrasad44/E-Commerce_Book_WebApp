
import React,{ Component } from "react";
import  * as ax  from '../../API/api';
class Purchase extends React.Component {
state={
    books:[]
}
    componentWillMount(){
ax.get_buyable_books()
.then((res)=>{
    if(res.status == 200){
    let payload = res.data.data; 
    this.setState({books : res.data.data});
    alert(" Buyer Books loaded")
}
else{
alert(res.data.msg)
window.location.href= "/profile"
}
})
    }


    addToCart(e){
        let book={}
        book.bookId = e.target.parentElement.parentElement.firstElementChild.id
        ax.add_to_cart(book)
        .then((res)=>{
            if(res.status == 200){
                alert("Added to cart Succesfully")
            }
            else{
            alert(res.data.msg)
            window.location.href= "/profile"
            }
        })
    }
    show_editSection(e){

      let aa = e.target.parentElement.parentElement.id
    //  let del = e.target.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.id
      if(e.target.parentElement.parentElement.id != null){
        ax.load_image(e.target.parentElement.parentElement.id)
        .then((res)=>{
          if(res!= undefined){
            if(res.status =="200"){
              console.log(res.data)
              JSON.parse(res.data.files).map((e)=>{
              let  imgdata = e[1]
              let  imgName = e[0]
                alert("Image loaded");
               
               
                var x = document.createElement("img");
                let srcc= "data:image/png;base64,"+imgdata;
                x.setAttribute("src",srcc );
  
                document.getElementById(aa).appendChild(x);
              
              })
              }

          }
          
        })
      }       
        e.target.parentElement.parentElement.nextElementSibling.style.display="block"
           }

    render() {
      return <div>
        <h1>Purchase Page</h1>
          <h5>You can but any books from below list</h5>
          <div id="listSection" className="container">
          <div className="row" ><div className="col-md-2"><b>Title</b></div><div className="col-md-2"><b>ISBN</b></div><div className="col-md-2"><b>Quantity</b></div><div className="col-md-2"><b>Price</b></div><div className="col-md-2"></div></div>
               {
                   Object.values(this.state.books).map((e)=>{
                     if(e.quantity>0){
                      return    <div>
                      <div className="row" id={e.id}><div className="col-md-2">{e.title}</div><div className="col-md-2">{e.ISBN}</div><div className="col-md-2">{e.quantity}</div><div className="col-md-2">{e.price}</div><div className="col-md-2"><button onClick={(e)=>{this.show_editSection(e)}}>View</button></div></div>
                   <div className="row update_section" style={{display:"none"}}>
                   <div className="row"><label className="col-md-6" htmlFor="title">title</label>
                         {/* <input type="text" name="title" placeholder= required /> */}
                         <div>{e.title}</div>
                       </div>
                       <div className="row"><label className="col-md-6" htmlFor="ISBN">ISBN</label>
                         {/* <input type="text" name="ISBN" placeholder={e.ISBN}  required /> */}
                         <div>{e.ISBN}</div>
                       </div>
                      
                       <div className="row"><label className="col-md-6" htmlFor="price">Price</label>
                         {/* <input type="number" step="0.01" name="price"   placeholder={e.price} required /> */}
                         <div>{e.price}</div>
                       </div>
                       <div className="row"><label className="col-md-6" htmlFor="quantity">Quantity</label>
                         {/* <input type="number" name="quantity"  placeholder={e.quantity} required /> */}
                         <div>{e.price}</div>
                       </div>
                       <div className="row"><label className="col-md-6" htmlFor="author">Authors</label>
                     <div>
                       {
                              
                               Object.values(e.authors).map((eee)=>{
                                 let a= ""
                                return a+=eee.authorName+",";
                               })
                             
                         } </div>
                       </div>
                       <div className="row"><label className="col-md-6" htmlFor="publicationDate">Publication Date</label>
                         {/* <input type="date" name="publicationDate" placeholder={e.publicationDate}  required /> */}
                       <div>{e.publicationDate}</div>
                        
                       </div>
                       <button onClick={(e)=>{this.addToCart(e)}}  >Add to Cart</button>
                         </div>
                  </div>
                     }
                     else{
                       return <div />
                     }
                       
                   })
               }
           </div>
          </div>
    }
  }

  export default Purchase;