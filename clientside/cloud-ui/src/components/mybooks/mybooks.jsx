
import React,{ Component } from "react";
import  * as ax  from '../../API/api';
import axios from 'axios';

import './mybooks.css'
class MyBooks extends React.Component {
state={
    books:[]
}
    componentWillMount(){
     
ax.getSellerBooks().then((res)=>{
  if(res!= undefined){
    if(res.status == 200){
      let payload = res.data.data; 
      this.setState({books : res.data.data});
   alert("Books loaded")
  }
  else{
  alert(res.data.msg)
  window.location.href= "/profile"
  }
  }
})
    }

    deleteBook(e){
      e.preventDefault()
     
      var shouldDelete = window.confirm("Do you want to delete?");
      if (shouldDelete) {
      
        ax.delete_book(e.target.parentElement.parentElement.id)
        .then((res)=>{
          let payload= res.data;
          console.log(payload)
          if(res.status =="200"){ 

            alert("Book deleted succesfully");
           // window.location.href ="/mybooks";
          }
          else {
            alert( "Book delete failed " + res.data.msg);
          }
          

        })
        .catch(()=>{

        })
      } else {
       
        // the user does not want to delete
      }
    }

    handleUpload = (bookId) => {
      var count=0;
      let file = document.getElementById("file_uploader").files;
      Object.values(file).map((e)=>{

      let fileParts = e.name.split('.');
      let fileName = fileParts[0];
      let fileType = fileParts[1];
      console.log("Preparing the upload");
      axios.post("https://"+window.location.hostname+":8080/uploadimage",{
        fileName : fileName+"_"+bookId,
        fileType : fileType
      },{ withCredentials : true})
      .then(response => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
      
        console.log("Recieved a signed request " + signedRequest);
        
       // Put the fileType in the headers for the upload
        var options = {
          headers: {
            'fileName': fileName+"_"+bookId
          }
        };
        axios.put(signedRequest,e,options)
        .then(res => {
          if(res.status==200){
          //  let fileParts = this.uploadInput.files[0].name.split('.');
            //      let fileName = fileParts[0];
                  let book={}

                   book.bookId = bookId;
                   book.imageName = fileName+"_"+bookId
                  ax.addImageName(book)
                  .then((ress)=>{
                    count++;
                    if(ress.status==200){
                      if(count == Object.values(file).length){

                      alert("image uploaded succesfully"); 
                      
                    
                      }
                    }
                  })
                  .catch(()=>{

                    alert("images uploaded failed 2");
                  }) 
           }
           else{
             alert("images uploaded failed 3");
           }
          console.log("Response from s3")
         return res;
        })
        .catch(error => {
          alert("ERROR " + JSON.stringify(error));
          return JSON.stringify(error)
        })
      })
      .catch(error => {
        alert(JSON.stringify(error));
        return JSON.stringify(error);
      })
      })
    }
    addmoreimage(e){
      let bookId=e.target.id.split("_")[1];
      console.log(bookId)
      var count=0;
      let file = document.getElementById("inputaddmore_"+bookId).files;
      Object.values(file).map((e)=>{

      let fileParts = e.name.split('.');
      let fileName = fileParts[0];
      let fileType = fileParts[1];
      console.log("Preparing the upload");
      axios.post("https://"+window.location.hostname+":8080/uploadimage",{
        fileName : fileName+"_"+bookId,
        fileType : fileType
      },{ withCredentials : true})
      .then(response => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
      
        console.log("Recieved a signed request " + signedRequest);
        
       // Put the fileType in the headers for the upload
        var options = {
          headers: {
            'fileName': fileName+"_"+bookId
          }
        };
        axios.put(signedRequest,e,options)
        .then(res => {
          if(res.status==200){
          //  let fileParts = this.uploadInput.files[0].name.split('.');
            //      let fileName = fileParts[0];
                  let book={}

                   book.bookId = bookId;
                   book.imageName = fileName+"_"+bookId
                  ax.addImageName(book)
                  .then((ress)=>{
                    count++;
                    if(ress.status==200){
                      if(count == Object.values(file).length){

                      alert("image uploaded succesfully"); 
                      
                    
                      }
                    }
                  })
                  .catch(()=>{

                    alert("images uploaded failed 2");
                  }) 
           }
           else{
             alert("images uploaded failed 3");
           }
          console.log("Response from s3")
         return res;
        })
        .catch(error => {
          alert("ERROR " + JSON.stringify(error));
          return JSON.stringify(error)
        })
      })
      .catch(error => {
        alert(JSON.stringify(error));
        return JSON.stringify(error);
      })
      })

    }

    add_book(e){
        e.preventDefault()
        let book={}
        book.title= document.getElementById("title").value;
        book.ISBN = document.getElementById("ISBN").value;
        book.publicationDate = document.getElementById("publicationDate").value;
        book.price= document.getElementById("price").value;
        book.quantity= document.getElementById("quantity").value;
        book.authors = document.getElementById("author").value;
        ax.addBook(book)
        .then((res)=>{
            let payload = res.data;

            if(res.status =="200"){

              alert("Book added succesfully");
              this.handleUpload(res.data.bookk.id)
              .then((ress)=>{
                if(ress.status==200){
                  
                  alert("images uploaded");
                }
                else{
                  alert("images uploaded failed 2");
                }
              })
              .catch(()=>{
                alert("images uploaded failed 3");
              })
              


             
            }
            else {
              alert( "Book adding failed " + res.data.msg);
            }
            
        console.log(payload)
        })
        .catch(()=>{

        })
    }


    deleteImage(e){
     let img_name=  e.target.id
     ax.delete_image(img_name)
     .then((res)=>{
        if(res.status ==200){
          alert("image deleted Successfully")
        }
        else{
          alert("image deleted Failed")  
        }
     })
    }

    show_editSection(e, bookid){
      
      let aa = e.target.parentElement.nextElementSibling.nextElementSibling.id
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
                var a = document.createElement("div");
               
               
                var x = document.createElement("img");
                let srcc= "data:image/png;base64,"+imgdata;
                x.setAttribute("src",srcc );
    
                var y = document.createElement("button");
                y.setAttribute("id",imgName );
                y.innerHTML="Delete Image"
                y.addEventListener("click", this. deleteImage);



                // var inputtag = document.createElement("input");
                // inputtag.setAttribute("type","file");
                // inputtag.setAttribute("multiple",true );
                
                // inputtag.setAttribute("id","inputaddmore_"+imgName.split("_")[1] );
                

                // var yy = document.createElement("button");
                // yy.setAttribute("id","addmore_"+imgName.split("_")[1] );
                // yy.innerHTML="Add more Image"
                // yy.addEventListener("click", this. addmoreimage);

                a.appendChild(x)
                a.appendChild(y)
                
               
                document.getElementById(aa).appendChild(a);
               // document.getElementById(aa).appendChild(y);
             //  document.getElementById(del).style.display="block";
              
              })
              }

          }
          
        })
      }
      
      e.target.parentElement.parentElement.nextElementSibling.style.display="block"
         }

         update_book_data(e){
           console.log(e.target)
           let book={}
          
           book.id=e.target.parentElement.parentElement.firstElementChild.id;
           
           if(e.target.parentElement.children[0].children[1].value!=""){
            book.title=e.target.parentElement.children[0].children[1].value
           }
           if(e.target.parentElement.children[1].children[1].value!=""){
            book.ISBN= e.target.parentElement.children[1].children[1].value
           }
           if(e.target.parentElement.children[2].children[1].value!=""){
            book.price = e.target.parentElement.children[2].children[1].value
           }
           if(e.target.parentElement.children[3].children[1].value!=""){
            book.quantity = e.target.parentElement.children[3].children[1].value
           }
           if(e.target.parentElement.children[4].children[1].value!=""){
            book.authors= e.target.parentElement.children[4].children[1].value
           }
           if(e.target.parentElement.children[5].children[1].value!=""){
           book.publicationDate= e.target.parentElement.children[5].children[1].value
           }
          
     
          
     
           
           
          

           ax.update_Book(book)
           .then((res)=>{
            let payload = res.data;
            console.log(payload)
            if(res.status =="200"){
        
              alert("Book updated succesfully");
              window.location.href ="/mybooks";
            }
            else {
              alert( "Book update failed " + res.data.msg);
            }
            
        console.log(payload)
           })

           console.log(book)
         }

    show_addbookSection(e){
        if(document.getElementById("addSection").style.display!= "none"){
            document.getElementById("addSection").style.display= "block"
            document.getElementById("listSection").style.display= "none"
          }
          else{
            document.getElementById("listSection").style.display= "block"
            document.getElementById("addSection").style.display= "none"
          }
    }


    render() {
      return <div>
          
           <div id="addSection"><div>Add Sectionn</div>
           <div>

           <input id="file_uploader"  type="file" multiple />
          <br/>
        
           <form>
                      <div><label htmlFor="title">title</label>
                          <input type="text" name="title" id="title" required />
                          
                        </div>
                        <div><label htmlFor="ISBN">ISBN</label>
                          <input type="text" name="ISBN" id="ISBN" required />
                          
                        </div>
                        <div> <label htmlFor="publicationDate">Publication Date</label>
                          <input type="date" name="publicationDate" id="publicationDate" required />
                         
                        </div>
                        <div> <label htmlFor="price">Price</label>
                          <input type="number" step="0.01" name="price"  id="price" required />
                        </div>
                        <div><label htmlFor="quantity">Quantity</label>
                          <input type="number" name="quantity" id="quantity" required />
                        </div>
                        <div><label htmlFor="author">Authors</label>
                          <input type="text" name="author" id="author" required />
                        </div>
                        
                  
                        <button class="btn btn-info switch"  onClick={(e)=>{this.add_book(e)}}>Add Book</button>
                     
                      </form>
           </div>
           <a href="/mybooks">Go back to List</a>
           </div>
           <div id="listSection" className="container">
           
          <br/>
          <br/>
          <br/>

           <button  onClick={(e)=>{this.show_addbookSection(e)}} id="add_book">Add a Book</button>
           <div className="row" ><div className="col-md-2"><b>Title</b></div><div className="col-md-2"><b>Price</b></div><div className="col-md-2"><b>Quantity</b></div><div className="col-md-2"><b>Price</b></div><div className="col-md-2"></div></div>
         
               {
                   Object.values(this.state.books).map((e)=>{
                       return    <div>
                       <div className="row" id={e.id}><div className="col-md-2">{e.title}</div><div className="col-md-2">{e.ISBN}</div><div className="col-md-2">{e.quantity}</div><div className="col-md-2">{e.price}</div><div id={"_"+e.id} className="col-md-2"><button onClick={(e)=>{this.show_editSection(e,e.id)}}> View and Edit</button></div><div className="col-md-2"><button onClick={(e)=>{this.deleteBook(e)}}>Delete</button></div><div className="showimagessection" id={"img_"+e.id}></div><div className="" id={"addmoreimg_"+e.id}><input type="file" id={"inputaddmore_"+e.id} multiple /><button onClick={(e)=>{this.addmoreimage(e)}} id={"addmoretbutton_"+ e.id}>add more images </button></div></div>
                    <div className="row update_section" style={{display:"none"}}>
                    <div><label htmlFor="title">title</label>
                          <input type="text" name="title" placeholder={e.title} required />
                          
                        </div>
                        <div><label htmlFor="ISBN">ISBN</label>
                          <input type="text" name="ISBN" placeholder={e.ISBN}  required />
                          
                        </div>
                       
                        <div> <label htmlFor="price">Price</label>
                          <input type="number" step="0.01" name="price"   placeholder={e.price} required />
                        </div>
                        <div><label htmlFor="quantity">Quantity</label>
                          <input type="number" name="quantity"  placeholder={e.quantity} required />
                        </div>
                        <div><label htmlFor="author">Authors</label>
                      
                          <input type="text" name="author"  placeholder={
                               
                                Object.values(e.authors).map((eee)=>{
                                  let a= ""
                                 return a+=eee.authorName;
                                })
                              
                          } required />
                        </div>
                        <div> <label htmlFor="publicationDate">Publication Date</label>
                          <input type="date" name="publicationDate" placeholder={e.publicationDate}  required />
                         
                        </div>
                        <button onClick={(e)=>{this.update_book_data(e)}}  >Update</button>
                          </div>
                   </div>
                   })
               }
           </div>
           <div id="editSection"></div>
            </div>
    }
  }

  export default MyBooks;