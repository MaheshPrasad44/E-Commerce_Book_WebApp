
/// Register User

import axios from 'axios';

 
export const registerUser = async (user) => {
    try {
     const res = await axios.post('https://'+window.location.hostname+':8080/addUser',user);
console.log("Register successful")
console.log(res.data);
     return res;
 } catch (error) {
  console.log(error.response)
  return (error.response);
   }
 }
 export async  function  login(username,password)  {// async function expression used as an IIFE
    try {
      let user= {}
      user.userName = username;
      user.password= password;
      const res = await axios.post('https://'+window.location.hostname+':8080/login',user,{ withCredentials : true});
       console.log(res.data);
       console.log("User login successful");
  return res;
  } catch (error) {
    console.log(error.response)
       return (error.response);
    }
  }

  export async  function  getuserdata()  {// async function expression used as an IIFE
    try {
     
      const res = await axios.get('https://'+window.location.hostname+':8080/getuserdata',{ withCredentials : true});
       console.log(res.data);
       console.log("Data obtained");
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }

  export async  function  log_out()  {// async function expression used as an IIFE
    try {
      const res = await axios.get('https://'+window.location.hostname+':8080/logout',{ withCredentials : true});
       console.log(res.data);
  return res.data;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }


  export async  function  getUserSpecificData()  {// async function expression used as an IIFE
    try {
      const res = await axios.get('https://'+window.location.hostname+':8080/getUserSpecificData?userId='+sessionStorage.getItem("userId"),{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }
  


  export async  function  updateUser(user)  {// async function expression used as an IIFE
    try {
      const res = await axios.post('https://'+window.location.hostname+':8080/update',user,{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }



  export async function  getSellerBooks()  {// async function expression used as an IIFE
    try {
      const res = await axios.get('https://'+window.location.hostname+':8080/getSellerBooks',{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }


  export async function  addBook(book)  {// async function expression used as an IIFE
    try {
      const res = await axios.post('https://'+window.location.hostname+':8080/addBook',book,{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }



  export async function  update_Book(book)  {// async function expression used as an IIFE
    try {
      const res = await axios.put('https://'+window.location.hostname+':8080/updateBook',book,{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }


  export async function  delete_book(Id)  {// async function expression used as an IIFE
    try {
      const book={ data:Id}
      const res = await axios.delete('https://'+window.location.hostname+':8080/deleteBook?bookId='+Id,{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }

  export async function  get_buyable_books()  {// async function expression used as an IIFE
    try {
      const res = await axios.get('https://'+window.location.hostname+':8080/get_buyable_books',{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }

  export async function  add_to_cart(book)  {// async function expression used as an IIFE
    try {
      const res = await axios.post('https://'+window.location.hostname+':8080/add_to_cart',book,{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }
  
  export async function  get_myCartItems()  {// async function expression used as an IIFE
    try {
      const res = await axios.get('https://'+window.location.hostname+':8080/get_myCartItems',{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }
  
  export async function  updateCart(cart)  {// async function expression used as an IIFE
    try {
      const res = await axios.put('https://'+window.location.hostname+':8080/updateCart',cart,{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }

  export async function  checkItemExist_Book(book)  {// async function expression used as an IIFE
    try {
      const res = await axios.post('https://'+window.location.hostname+':8080/checkItemExist_Book',book,{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }
  export async function  getimage(book)  {// async function expression used as an IIFE
    try {
      const res = await axios.get('https://'+window.location.hostname+':8080/getimages',{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }

  export async function  addImageName(book)  {// async function expression used as an IIFE
    try {
      const res = await axios.post('https://'+window.location.hostname+':8080/addImage',book,{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }
  

  export async function  load_image(bookId)  {// async function expression used as an IIFE
    try {
      const res = await axios.get('https://'+window.location.hostname+':8080/load_image?bookId='+bookId,{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }

  
  export async function  delete_image(name)  {// async function expression used as an IIFE
    try {
     // const book={ data:Id}
      const res = await axios.delete('https://'+window.location.hostname+':8080/deleteImage?imgname='+name,{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }
  

  export async function  forgotpassport_api(obj)  {// async function expression used as an IIFE
    try {
     // const book={ data:Id}
      const res = await axios.post('https://'+window.location.hostname+':8080/forgot_password',obj,{ withCredentials : true});
       console.log(res.data);
  return res;
  } catch (error) {
    console.log(error.response)
    return (error.response);
    }
  }
  
  