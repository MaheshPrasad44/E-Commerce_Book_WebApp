var aws = require('aws-sdk'); 
const bookServices= require('../services/bookServices')
const userServices= require('../services/userServices')


const { v4: uuidv4 } = require('uuid');
const statsClient = require('statsd-client');
const statsd = new statsClient({host: 'localhost', port: 8125});

const logger = require('./winstonLogger');
// Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
const path = require('path');
var stream = require('stream');

require('dotenv').config();
aws.config.update({
    region: 'us-east-1', // Put your aws region here
    signatureVersion:"v4"
     })

const S3_BUCKET = process.env.bucket
// Now lets export this function so we can call it from somewhere else
exports.sign_s3 = (req,res) => {
   
    //require('dotenv').config(); 
   
  const s3 = new aws.S3();  // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  console.log("bucketsss " + S3_BUCKET + "key "+ process.env.AWSAccessKeyId+ " sec"+ process.env.AWSSecretKey )
// Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read'
  };
// Make a request to the S3 API to get a signed URL which we can use to upload our file
s3.getSignedUrl('putObject', s3Params, (err, data) => {
    console.log("reached getsigned")
    const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
    if(err){
      console.log(err);
      logger.info(" get signed url failed ")
      res.json({success: false, error: err})
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 

    // Send it all back
    else{

      logger.info(" get signed url success  &  image upload successfull")
        res.json({success:true, data:{returnData}});
    }

  });
}



exports.downloadFile= (req,res)=>{

  statsd.increment('Downloaded image ');
  var timer = new Date();
  var attachment=[];
  var imageNames=[];
  var count=0;
  var mapp = new Map();
  bookServices.getImagesbyBookId(req.query.bookId)
  .then((result)=>{
    console.log(result);
    result.map((e)=>{
   
    console.log("reached indide download "+ e.imageName )
    imageNames.push(e.imageName )
    let s3_filename=   e.imageName 
    const s3Client = new aws.S3({
      region : 'us-east-1',
      signatureVersion:"v4"
       });
    
    const downloadParams = {
            Bucket: S3_BUCKET, 
            Key: '' // pass key
    };
     const params = downloadParams;
    params.Key = s3_filename;
    s3Client.getObject(params, function(error, data) {
      count++;
      console.log(data.Body.toString('base64'))
      let aa= data.Body.toString('base64')
      attachment.push(aa);
      mapp.set(s3_filename,aa)
     if(count == result.length){
       console.log(count)

      logger.info("  get object success ")
      res.status(200);
      res.json({
        files: JSON.stringify([...mapp])
        //,"img":imageNames
      })
      statsd.timing('Get image time ', timer);
      return;
     }
  })

    })
  })
  
}

exports.deleteFile=(req,res)=>{
  

  statsd.increment('deleted image ');
  var s3 = new aws.S3({
  
  region : 'us-east-1',
  signatureVersion:"v4"
  });
  var params = {  Bucket: S3_BUCKET, Key: req.query.imgname };
  
  s3.deleteObject(params, function(err, data) {
    if (err) console.log(err, err.stack);  // error
    else{
    bookServices.deleteImagefromDB(req.query.imgname)
    .then((data)=>{

      logger.info(" delete image successfull ")
      res.status(200);
      res.json({
        msg:" image deleted Successfully"
      })
      statsd.timing('Image delete Time', timer);
    })
  
    }                  // deleted
  });
}


exports.deleteFile_byBook=(key,count,obj,res)=>{
  
  statsd.increment('delete image by book');
console.log(" image countt"+count)
  var s3 = new aws.S3({ 
  region : 'us-east-1',
  signatureVersion:"v4"
});

var params = {  Bucket: S3_BUCKET, Key: key };
  
  s3.deleteObject(params, function(err, data) {
    if (err) console.log(err, err.stack);  // error
    else{
      
      bookServices.deleteImagefromDB(key)
      .then((data)=>{
        obj.counter++;
           if(count==obj.counter){

      logger.info("  Book deleted successfull")
            console.log(" complete success")
              res.status(200);
              res.json({
                 msg : "deleted everthing successfully"
              })
              statsd.timing('Book deletion Time', timer);
          }
         
      })
    
    }                  // deleted
  });
}

exports.forgot = (req,res)=>{

  userServices.checkDuplicateUserName(req)
      .then((count)=>{
         if(count>0){
          

logger.info("reached forgot func...")

var sns = new aws.SNS({
  region: 'us-east-1', // Put your aws region here
  signatureVersion:"v4"
});

let msg={};
msg.email=req.body.userName
msg.uuid= uuidv4();
let stringy_msg = JSON.stringify(msg);
let data = {
  Message: stringy_msg,
  TopicArn: process.env.TOPIC_ARN
}

logger.info("starting publsihing ....")
sns.publish(data, (err, data) => {
  if (err) {
      logger.info(" failed to publish" + err);
      res.status(500);
              res.json({
                 msg : "Failed to send email.... "
              })
  } else {
      logger.info(" SNS published successfully!");
      res.status(200);
              res.json({
                 msg : "email sent successfully"
              })
  }
})



         }
         else{
           
   logger.info(" UserName doesnot exists in the database... please enter the correct email address ");
   res.status(500);
   res.json({
      msg:"UserName doesnot exists in the database... please enter the correct email address"
   })
   return;
        }
        })




}