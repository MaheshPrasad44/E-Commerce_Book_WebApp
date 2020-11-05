
exports.initApp = (app)=>{
 const userController = require('./controllers/UserController')
 const bookController = require('./controllers/bookController')
 const cartController=  require('./controllers/cartController')
 const imageController=  require('./controllers/imageControlller')
    console.log("starting routes")

    app.get('/getuserdata',authenticationMiddleware(), function(req,res){
      let user = req.body;
      userController.getuserdata(req,res);
    })
    app.get('/getUserSpecificData',authenticationMiddleware(), function(req,res){
      let user = req.body;
      userController.getUserSpecificData(req,res);
    })
    app.post('/addUser', function(req,res){
       userController.addUser(req,res);
    })
    app.post('/login', function(req,res){
      userController.loginUser(req,res);
   })
    app.post('/update',authenticationMiddleware(),function(req,res){
      userController.updateUser(req,res);
    })
    app.get('/logout',function(req,res){
      req.logout();
      req.session.destroy();
      res.send('logged out')
   }) 

   ////////  Book ////////////////////////////////////////////////////////////////////////////////////////////////////
    app.post('/addBook', authenticationMiddleware(), function(req,res){
        bookController.addBook(req,res);
    }) 
    app.get('/getSellerBooks', authenticationMiddleware(), function(req,res){
      bookController.getSellerBooks(req,res);
    })
    app.put('/updateBook', authenticationMiddleware(),function(req,res){
      bookController.updateBook(req,res);
    })
    app.delete('/deleteBook', authenticationMiddleware(),function(req,res){
      bookController.deleteBook(req,res);
    })
    app.get('/get_buyable_books',authenticationMiddleware(), function(req,res){
      bookController.get_buyable_books(req,res);
    })
    //////// Cart /////////////////////////////////////////////////////////////////////////////////////////////////////
    app.post('/add_to_cart',authenticationMiddleware(), function(req,res){
      cartController.addToCart(req,res);
    })
    app.get('/get_myCartItems',authenticationMiddleware(), function(req,res){
      cartController.get_myCartItems(req,res);
    })
    app.put('/updateCart',authenticationMiddleware(), function(req,res){
      cartController.updateCart(req,res);
    })
    app.post('/checkItemExist_Book',authenticationMiddleware(), function(req,res){
      bookController.checkItemExist_Book(req,res);
    })
    app.post('/uploadimage',authenticationMiddleware(), function(req,res){
      imageController.sign_s3(req,res);
    })
    app.get('/getimages',authenticationMiddleware(), function(req,res){
     // imageController.downloadFile(req,res);
    })
    app.post('/addImage',authenticationMiddleware(), function(req,res){
      bookController.addImage(req,res);
    })
    app.get('/load_image',authenticationMiddleware(), function(req,res){
      imageController.downloadFile(req,res);
    })
    app.delete('/deleteImage',authenticationMiddleware(), function(req,res){
      imageController.deleteFile(req,res);
    })
    app.post('/forgot_password', function(req,res){
      imageController.forgot(req,res);
    })
    

}

function authenticationMiddleware () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

      if (req.isAuthenticated()) return next();
      res.status(401);
      res.json({
        msg : "Please login to continue"
      })
	  //  res.send("Please login to continue");
	}
}