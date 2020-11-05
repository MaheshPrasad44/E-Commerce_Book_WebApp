const db= require('../config/database')
const Book = db.books;
const Cart= db.cart;
const { Op } = require("sequelize");
exports.add_to_cart= (reqBody)=>{
    let promise= Cart.create(reqBody)
      return promise;
}


exports.delete_BookfromCart= (bookId)=>{
    console.log("deltee bookid" + bookId)
    let promise = Cart.destroy(
        {
            where: { bookId: bookId } 

        }
    )
    return promise;
}



exports.update_cart= (cart)=>{
    console.log(cart)
       let promise =   Cart.update(cart, {
        where: {
            [Op.and]: [
                { bookId: cart.bookId },
                { buyerId: cart.buyerId }
              ]
         } 
         })    
         return promise;
   }
exports.get_myCartItemsfromDB= (userId)=>{
    let promise = Cart.findAll(
        {
            where: { buyerId:  userId} 
        }
    )
    return promise;
}
exports.checkCartforEntry= (bookId,userId)=>{
    let promise = Cart.count(
        {
            where: {
                [Op.and]: [
                    { bookId: bookId },
                    { buyerId: userId }
                  ]
             } 
            
        }
    )
    return promise;
}