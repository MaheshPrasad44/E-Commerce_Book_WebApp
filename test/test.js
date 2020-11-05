var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server');

//Test User Info
var user={
        "userName": "maheshprasad4498@gmail.com",
        "firstName": "Mahesh",
        "lastName": "Prasad",
        "password": "mahesh1234$%%"    
}
// IT is the Test Case for Registering the User

it('Test Case 1: User Register', function(done) {
  request(app).post('/register').send(user).expect(function(res) {
      let code= res.statusCode;
// Accessing the response code
      if (  code !== 400 && code !== 200  && code !== 500) {
        throw Error('unexpected status code: ' + code);
      }
    })
    .expect('Content-Type', /json/)
    .end(function(err, res) {
          if (err) console.log(err);
       });
    done();
});


