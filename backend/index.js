const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const session = require('express-session');
const config = require('config');

// const routes = require('./router')
// const seed = require('./controllers/seed')

const mongoose = require('mongoose');
require('dotenv').config();
const aws = require('aws-sdk');

const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config({path: __dirname + '/.env'});


const spacesEndpoint = new aws.Endpoint('https://nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({ endpoint: spacesEndpoint });

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

  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true})) ;

const db = config.get('db');
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

let auth = require('./routes/auth');
let register = require('./routes/register');
let verify = require('./middlewares/verifyToken');
let user = require('./routes/user');
let subject = require('./routes/subject');
let article = require('./routes/article');
let section = require('./routes/section');
let tool = require('./routes/tool');
let search = require('./routes/search');
let comment = require('./routes/comment');

app.use('/login',auth);
app.use('/register',register);
app.use(verify.verify);
app.use('/user',user);
app.use('/subject',subject);
app.use('/article',article);
app.use('/section', section);
app.use('/tool', tool);
app.use('/search', search);
app.use('/comment', comment);


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

const port = process.env.PORT || 3000;
const server = app.listen(port,()=>console.log(`Listening on port ${port}`));

console.log('hello world');