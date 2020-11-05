const db= require('../config/database')
const Book = db.books;
const { Op } = require("sequelize");
const Author= db.authors;
const Image= db.images;
exports.add_BooktoDB= (reqBody)=>{
    let promise= Book.create(reqBody)
      return promise;
}

exports.addImagetoDB= (reqBody)=>{
    let promise= Image.create(reqBody)
      return promise;
}

exports.add_AuthorToBook= (bookId,authorName)=>{
    const author={}
    author.BookId = bookId;
    author.authorName = authorName;
    let promise= Author.create(author)
      return promise;
}


exports.update_AuthorToBook= (bookId,authorName)=>{
    const author={}
    author.BookId = bookId;
    author.authorName = authorName;
    let promise= Author.create(author)
      return promise;
}

exports.get_buyableBooksfromDB= (userId)=>{
    let promise = Book.findAll(
        {
            where: { sellerId: { [Op.not]: userId} } ,
            include: ["authors"] 
        }
    )
    return promise;
}
exports.getImagesbyBookId= (id)=>{
    let promise = Image.findAll(
        {
            where: { bookId: id } 
        }
    )
    return promise;
}

exports.findBook_byId= (bookId)=>{
    let promise = Book.findOne({ where: { id: bookId } });
    return promise;
}



exports.getAllSellerBooks= (userId)=>{
    let promise = Book.findAll(
        {
            where: { sellerId: userId } ,
            include: ["authors"] 
        }
    )
    return promise;
}

exports.delete_Authors= (bookId)=>{
    let promise = Author.destroy(
        {   
            where: { BookId: bookId } 

        }
    )
    return promise;
}


exports.delete_book= (bookId)=>{
    console.log("deltee bookid" + bookId)
    let promise = Book.destroy(
        {
            where: { id: bookId } 

        }
    )
    return promise;
}
exports.deleteImagefromDB= (name)=>{

    let promise = Image.destroy(
        {
            where: { imageName: name } 

        }
    )
    return promise;
}


exports.update_Book= (book)=>{
 console.log(book)
    let promise =   Book.update(book, {
        where: {
          id:  book.id
        }
      })    
      return promise;
}

exports.checkBookforEntry= (bookId)=>{
    let promise = Book.count(
        {
            where: {
                id:  bookId
              } 
            
        }
    )
    return promise;
}

