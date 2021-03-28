const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const PORT = 4000;
const session = require('express-session');
const routes = require('./router')
const mongoose = require('mongoose');

const seed = require('./controllers/seed')

mongoose.set('useNewUrlParser', true);
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


// require('dotenv').config();
require('dotenv').config({path: __dirname + '/.env'})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})) ;


// Connect to the mongodb
// Cluster0, database: test
// const url = 'mongodb+srv://admin:1@cluster0-b9h95.mongodb.net/test?retryWrites=true&w=majority'
const url =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL || process.env.MONGODB_URI ||
    'mongodb://localhost/rs_tests';
mongoose.connect(url, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
connection.on('error', function(err) {
    console.log(err);
});

//set up session
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
app.use('/login',auth);

let register = require('./routes/register');
app.use('/register',register);
//

// middleware to check whether logged in
let verify = require('./middlewares/verifyToken');
app.use(verify.verify);
app.post('/upload', function (request, response, next) {
    upload(request, response, function (error) {
      if (error) {
        console.log(error);
        // return response.redirect("/error");
        return response.json("{status:error}")
      }
      console.log('File uploaded successfully.');
    //   response.redirect("/success");
    return response.json("{status:ok}")
    });
  });

let user = require('./routes/user');
app.use('/user',user);

// app.use('/', routes);

let subject = require('./routes/subject');
app.use('/subject',subject);

let article = require('./routes/article');
app.use('/article',article);

let section = require('./routes/section');
app.use('/section', section);


let tool = require('./routes/tool');
app.use('/tool', tool);

let search = require('./routes/search');
app.use('/search', search);

let comment = require('./routes/comment');
app.use('/comment', comment)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

// need to check the following code for adding default admin user
// seed

module.exports = app;

