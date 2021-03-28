const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const session = require('express-session');


const mongoose = require('mongoose');
require('dotenv').config();
const aws = require('aws-sdk');

const multer = require('multer');
const multerS3 = require('multer-s3');
const spacesEndpoint = new aws.Endpoint('https://nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

// Change bucket property to your Space name
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'soft-repo-team',
      acl: 'public-read',
      key: function (request, file, cb) {
        console.log(file);
        cb(null, file.originalname);
      }
    })
  }).array('upload', 1);
  
  
require('dotenv').config({path: __dirname + '/.env'})
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true})) ;

const db ='mongodb://localhost/rs_tests';
mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true })
        .then(()=>console.log(`Connected to ${db}..`));


app.use(session({
    secret: 'chyingp',
    // store: new FileStore(),
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 60 * 1000 *30
    }
}));

let auth = require('./Back_end/routes/auth');
app.use('/login',auth);


let register = require('./Back_end/routes/register');
app.use('/register',register);

let verify = require('./Back_end/middlewares/verifyToken');
app.use(verify.verify);

app.post('/upload', function (request, response, next) {
    upload(request, response, function (error) {
      if (error) {
        console.log(error);
        return response.json("{status:error}")
      }
      console.log('File uploaded successfully.');
    //   response.redirect("/success");
    return response.json("{status:ok}")
    });
  });

let user = require('./Back_end/routes/user');
app.use('/user',user);

let subject = require('./Back_end/routes/subject');
app.use('/subject',subject);

let article = require('./Back_end/routes/article');
app.use('/article',article);

let section = require('./Back_end/routes/section');
app.use('/section', section);


let tool = require('./Back_end/routes/tool');
app.use('/tool', tool);

let search = require('./Back_end/routes/search');
app.use('/search', search);

let comment = require('./Back_end/routes/comment');
app.use('/comment', comment)

const port = process.env.PORT || 3000;
const server = app.listen(port,()=>console.log(`Listening on port ${port}`));

console.log('hello world');