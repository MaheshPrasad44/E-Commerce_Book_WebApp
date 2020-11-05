const bookServices= require('../services/bookServices')
const userServices= require('../services/userServices')
const cartServices= require('../services/cartServices')


const statsClient = require('statsd-client');
const statsd = new statsClient({host: 'localhost', port: 8125});


const imageController=  require('./imageControlller')
const logger = require('./winstonLogger');
exports.addBook = (req,res)=>{
    var timer = new Date();
    const book= {};

    book.title = req.body.title;
    book.ISBN = req.body.ISBN;
    book.publicationDate = req.body.publicationDate;
    book.quantity = req.body.quantity;
    console.log("price dd")
    console.log(req.body.price<0.01 || req.body.price >9999.99)
    if( req.body.price && (req.body.price<0.01 || req.body.price >9999.99)){

      logger.info(" Price should be above 0.01 and below 9999.99")
        res.status(400);
        res.json({
        msg:"Price should be above 0.01 and below 9999.99 "
        })
        return;
       }
      else if(req.body.quantity && ( req.body.quantity.includes('.')  || req.body.quantity<1 || req.body.quantity >999)){
        
      logger.info("quantity should be above 0 and below 999. No Decimals allowed ")
        res.status(400);

         res.json({
        msg:"quantity should be above 0 and below 999. No Decimals allowed "
        })
        return;
       }
    book.price= req.body.price;
    book.sellerId =  req.session.passport.user
   var author=[];
   var count=0;
   if( req.body.authors &&  req.body.authors.includes(',')){
    author = req.body.authors.split(",");
   }
   else{
       author.push(req.body.authors)
   }
    console.log(author.length)
    console.log(author)
    
    bookServices.add_BooktoDB(book)
    .then((bookk)=>{

    statsd.increment('books added');
        console.log(bookk)
        author.forEach((e)=>{
            bookServices.add_AuthorToBook(bookk.id,e)
            .then((ee)=>{
             console.log("added author"+ ee) 
             count++;
             if(count == author.length){

      logger.info("Booked added successfully ")
                res.status(200);
                res.json({
                   bookk
                })
                statsd.timing('Book added Time', timer);
            }
            })
            .catch((ee)=>{

      logger.info("Failed to add the author to the database ")
                res.status(500);
                res.json({
                msg:"Failed to add the author to the database "
                })
            })
        })
        console.log(count)
        
    })
    .catch((err)=>{

      logger.info("Failed to add the book to database ")
        console.log(err)
        res.status(500);
        res.json({
           msg:"Failed to add the book to database "
        })
    })
 }

 exports.addImage = (req,res)=>{
    var timer = new Date();
    bookServices.addImagetoDB(req.body)
    .then((data)=>{

    statsd.increment('image added');
    
        logger.info("Add images to database RDS")
        res.status(200);
                    res.json({
                    data
                    }) 
                    statsd.timing(' Timing Image added time to RDS', timer);
    })
    .catch((err)=>{
        logger.info("Failed to add the images to database ")
        res.status(500);
        res.json({
           msg:"Failed to add the images to database "
        })
    })
 }
 

 exports.get_buyable_books = (req,res)=>{
    var timer = new Date();
    userServices.get_UserSpecificData(req)
    .then((result)=>{
        if(result.userType === "Buyer" || result.userType === "Both"){
                const userID =  req.session.passport.user
                bookServices.get_buyableBooksfromDB(userID)
                .then((data)=>{
                    
                    logger.info("get buyable books ")
                    res.status(200);
                    res.json({
                    data
                    })
                    statsd.timing('Get Buyable books Time', timer);
                })
                .catch((err)=>{
                    logger.info(" failed to get buysable books ")
                    console.log(err)
                    res.status(500);
                    res.json({
                        msg:"Failed to to delete the books "
                    })
                })
            }
            else{
                logger.info("  User is not a Buyer ")
                res.status(500);
                res.json({
                   msg:"User is not a Buyer "
                })
              }
        })
        .catch((err)=>{
            logger.info("  User not found in the database")
            console.log(err)
          res.status(500);
          res.json({
             msg:"User not found in the database"
          })
        })  

}

exports.deleteBook = (req,res)=>{

    var obj={counter:0};  
          bookServices.delete_Authors(req.query.bookId)
          .then((data)=>{
              bookServices.delete_book(req.query.bookId)
              .then(()=>{
                cartServices.delete_BookfromCart(req.query.bookId)
                .then(()=>{
                        bookServices.getImagesbyBookId(req.query.bookId)
                        .then((res_images)=>{
                            var count=res_images.length

                                res_images.map((e_i)=>{
                                    console.log("image name: "+ e_i.imageName)

                                         statsd.increment('book deleted ');
                                     imageController.deleteFile_byBook(e_i.imageName,count,obj,res)
                                    
                                        
                                })

                        })
                })
                .catch(()=>{
                    console.log(err)
                    logger.info(" Failed to to delete all the copies of the book ")
                    res.status(500);
                    res.json({
                        msg:"Failed to to delete all the copies of the book"
                    })
                })
              })
              .catch(()=>{
                console.log(err)
                logger.info(" Failed to to delete the AUthor details from Books ")
                   
                res.status(500);
                res.json({
                    msg:"Failed to to delete the AUthor details from Books "
                })
              })
          })
          .catch((err)=>{
              console.log(err)
              logger.info(" Failed to to delete the books  ")
                 
              res.status(500);
              res.json({
                  msg:"Failed to to delete the books "
              })
          })
   }
   

exports.getSellerBooks = (req,res)=>{
    var timer = new Date();
  userServices.get_UserSpecificData(req)
  .then((result)=>{
      if(result.userType === "Seller" || result.userType === "Both"){
        bookServices.getAllSellerBooks(result.id)
        .then((data)=>{

               statsd.increment('get seller data ');
            logger.info(" get seller books successfully ")
               
            res.status(200);
            res.json({
                data
            })
            statsd.timing('Get seller book Time', timer);
        })
        .catch((err)=>{
            console.log(err)
            logger.info(" get seller books failed")
            res.status(500);
            res.json({
                msg:"Failed to fetch the seller books "
            })
        })

      }
      else{
        logger.info(" User is not a seller ")
        res.status(500);
        res.json({
           msg:"User is not a seller "
        })
      }
  })
  .catch((err)=>{
    logger.info(" User not found in the database ")
      console.log(err)
    res.status(500);
    res.json({
       msg:"User not found in the database"
    })
  })  
 }
 

 exports.updateBook = (req,res)=>{
    var timer = new Date();
     console.log("reached control")
     console.log(req.body)
    const book= {};
    book.title = req.body.title;
    book.ISBN = req.body.ISBN;
    book.publicationDate = req.body.publicationDate;
    book.quantity = req.body.quantity;
    book.price= req.body.price;
    book.sellerId =  req.session.passport.user
    book.id = req.body.id
    book.imageName=req.body.imageName;
   // book.updatedAt= Date(Date.now()); 
   var author=[];
   var count=0;
   console.log(req.body.price)
   console.log(req.body.price && req.body.price<0.01 && req.body.price >9999.99 )
   if( req.body.price && (req.body.price<0.01 || req.body.price >9999.99)){
    res.status(400);
    res.json({
    msg:"Price should be above 0.01 and below 9999.99 "
    })
    return;
   }
   else if(req.body.quantity && ( req.body.quantity.includes('.')  || req.body.quantity<1 || req.body.quantity >999)){
    res.status(400);
     res.json({
    msg:"quantity should be above 0 and below 999. No Decimals allowed "
    })
    return;
   }
   console.log(req.body.authors)
   if( req.body.authors && req.body.authors.includes(',')){
    author = req.body.authors.split(",");
   }
   else{
       author.push(req.body.authors)
   }
    console.log(author)

          bookServices.update_Book(book)
          .then((data)=>{

    statsd.increment('books updated');
              if(req.body.authors !== undefined){
                bookServices.delete_Authors(book.id)
             .then(()=>{
                author.forEach((e)=>{
                    console.log("indi "+e)
                    bookServices.update_AuthorToBook(book.id,e)
                    .then((ee)=>{
                    console.log("updated author"+ ee) 
                    count++;
                    if(count == author.length){
                        logger.info(" updated the book successfully ")
                        res.status(200);
                        res.json({
                        book
                        })
                        statsd.timing('Update book Time', timer);
                    }
                    })
                    .catch((ee)=>{
                        res.status(500);
                res.json({
                msg:"Failed to add the author to the database "
                })
                    })
                })
                console.log(count)
           })
           .catch((err)=>{
            console.log(err)
            logger.info(" Failed to delete the existing entries of authors in the Book ")
              res.status(500);
              res.json({
                  msg:"Failed to delete the existing entries of authors in the Book"
              })
           })   
              }
              else{
                res.status(200);
                res.json({
                book
                })
              }
          })
          .catch((err)=>{
              console.log(err)
              res.status(500);
              res.json({
                  msg:"Failed to update the book "
              })
          })
   }
   
   
exports.checkItemExist_Book = (req,res)=>{
    var timer = new Date();
    bookServices.checkBookforEntry(req.body.bookId)
    .then((result)=>{
        logger.info(" item exists")
        res.status(200);
      res.json({
        result
      })
      statsd.timing('Check item exists Time', timer);
      
    })
    .catch((err)=>{
          logger.info(" item doesnot exists")
       
        console.log(err)
      res.status(500);
      res.json({
         msg:"User not found in the database"
      })
    })  
   }