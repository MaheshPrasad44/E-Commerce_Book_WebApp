const cartServices= require('../services/cartServices')
const bookServices= require('../services/bookServices')
const userServices= require('../services/userServices')
const logger = require('./winstonLogger');

const statsClient = require('statsd-client');
const statsd = new statsClient({host: 'localhost', port: 8125});

exports.get_myCartItems = (req,res)=>{
    var timer = new Date();
    statsd.increment('get cart items');
    userServices.get_UserSpecificData(req)
    .then((result)=>{
        if(result.userType === "Buyer" || result.userType === "Both"){

            cartServices.get_myCartItemsfromDB(req.session.passport.user)
            .then((cartitems)=>{
        console.log(cartitems)

        logger.info(" Cart loaded ")
            res.status(200);
            res.json({
                cartitems
            })
            statsd.timing('get cart items Time', timer);
            })
            .catch((err)=>{

      logger.info(" Failed to load cart items ")
            res.status(500);
            res.json({
                msg:"Failed to load cart items  "
            })
        })
    }
    else{

      logger.info(" User is not a buyer")
        res.status(500);
        res.json({
           msg:"User is not a Buyer "
        })
      }
})
.catch((err)=>{
    console.log(err)
    logger.info(" Users were not found in the database ")
  res.status(500);
  res.json({
     msg:"User not found in the database"
  })
})  
 
 }


exports.updateCart = (req,res)=>{
    var timer = new Date();
    statsd.increment('update cart items');
    let bookId= req.body.bookId
    let addedQuantity = parseInt(req.body.new)

    if(req.body.new.includes(".") || addedQuantity < 0){

      logger.info(" updated cart successfully")
        res.status(400);
       res.json({
          msg:"No decimals allowed for Quantity and also cannot be less than zero"
       })
       return;
    }
    let quantity= parseInt(req.body.quantity);
   
    bookServices.findBook_byId(bookId)
    .then((book)=>{
      let db_count=   parseInt(book.quantity)
    
    let totalaval =db_count   + quantity
    console.log(" old "+quantity+ " new _ "+ addedQuantity)
    console.log(" book_qua _ "+db_count)
    console.log("totalaval_ "+ totalaval )  
    if(totalaval < addedQuantity){

      logger.info(" Maximum quantity exceeded")
        res.status(400);
        res.json({
           msg:"Maximum available quantity is : "+ totalaval
        })
        return;
    }
    else if(totalaval >= addedQuantity){
        let up_book= {}
        up_book.id=bookId
        up_book.quantity= totalaval - addedQuantity
     bookServices.update_Book(up_book)
     .then(()=>{
         let cartt={}
         cartt.addedQuantity= addedQuantity;
         cartt.buyerId= req.session.passport.user
         cartt.bookId= bookId
         cartServices.update_cart(cartt)
         .then((datae)=>{
            res.status(200);
            res.json({
               datae
            })
            statsd.timing('Update cart time ', timer);
         })
         .catch(()=>{

      logger.info(" failed to upload cart items ")
            res.status(500);
            res.json({
               msg:"Failed to load cart items  "
            })
         })
     })

    }
    })
    .catch((err)=>{

      logger.info(" failed to update the cart ")
       res.status(500);
       res.json({
          msg:"Failed to update Cart -  "
       })
   })
 
 }

exports.addToCart = (req,res)=>{
    var timer = new Date();
    statsd.increment('add to cart ');
const  bookId =req.body.bookId;
console.log("book_id_ " + bookId)
bookServices.findBook_byId(bookId)
.then((data)=>{
    console.log( " book _data"+data);
   let book={}
   book.title = data.title
   book.quantity;
   book.price= data.price
   book.bookId= req.body.bookId;
   book.sellerId = data.sellerId;
   book.addedQuantity = 1;
   book.buyerId = req.session.passport.user
cartServices.checkCartforEntry(bookId,req.session.passport.user)
.then((dataa)=>{
    console.log("chack data" + dataa)
    if(dataa > 0){

      logger.info(" already added to cart ")
        res.status(400);
        res.json({
           msg:"Already added to cart"
        })
        
    }
    else{
        cartServices.add_to_cart(book)
        .then((cart)=>{
            let addedQuantity ={}
            addedQuantity.id= bookId;
            addedQuantity.quantity = data.quantity - 1;
            console.log(addedQuantity)
            bookServices.update_Book(addedQuantity)
            .then(()=>{
                res.status(200);
                res.json({
                   cart
                })
                statsd.timing('Add to the cart', timer);
            })
            .catch((err)=>{

      logger.info(" failed to update the book quantity")
                res.status(500);
                res.json({
                   msg:"Failed updated the book quantity"
                })
            })
         
        })
        .catch((err)=>{

      logger.info(" failed to add the cart ")
           res.status(500);
           res.json({
              msg:"Failed to add to Cart"
           })
       })
    }
   

})
.catch(()=>{
   
    logger.info(" already in cart 2")
    res.status(400);
    res.json({
       msg:"Already added to cart2 "
    })

})


   

})
.catch((err)=>{
    
    logger.info("  book not available  in th moment")
    console.log(err)
    res.status(500);
    res.json({
       msg:"Book not available at moment.."
    })
})

 
 
 }