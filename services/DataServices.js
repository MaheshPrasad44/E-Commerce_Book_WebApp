var connection
setupConnection=()=>{

  var mysql      = require('mysql');
   connection= mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'cloudDB'
  });
   
  connection.connect(function(err) {
      if (err) {
        return console.error('error: ' + err.message);
      }
    else{
      console.log('Connected to the MySQL server.');

    }
          });
   
}
endConnection = ()=>{
  connection.end();
}

exports.getUserDatafromDB =()=>{
let resObj= [];

  return new Promise(function(resolve,reject){
    setupConnection();

    connection.query('SELECT * from User', function (error, results) {
      if (error) throw error;
      console.log('The solution is: ', results);
      results.forEach( (row) => {
       resObj.push({"firstName": row.firstName,"lastName" : row.lastName})

       console.log(resObj)
       if(resObj){
         resolve(resObj)
       }
       else{
         reject("somthing went wrong please try again")
       }

      });
    })
  
    endConnection();
   
  })
  
}
