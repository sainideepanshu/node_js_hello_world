const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const PORT = process.env.PORT || 3000;

const bodyParser = require("body-parser"); // body-parser is a middleware
app.use(bodyParser.json()); // req.body

const MenuItem = require("./models/MenuItem");

passport.use(new LocalStrategy(async (userName,passWord,done) => {

  // Authentication logic here

  try{

    console.log('Recieved credentials : ',userName,passWord);

    const user = await Person.findOne({username : userName});

    if(!user){  // if user is null i.e. can't find user in database

      return done(null,false,{message : 'Incorrect username '});
    }

    // Now if user is not null and present in database then we will match password with the password of user present in database 

    const isPasswordMatch = user.password === passWord ? true : false;

    if(isPasswordMatch){

      return done(null,user);
    }
    else{
      return done(null,false,{message : 'Incorrect password '});
    }

  }catch(err){

    return done(err);
  }

}));

app.use(passport.initialize());



// Middleware functions

const logRequest = (req,res,next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next(); // moving on to the next phase
}

app.use(logRequest);


const localAuthMiddleware = passport.authenticate('local',{session : false});

app.get("/",localAuthMiddleware ,function (req, res) {
  res.send("Welcome to my Hotel");
});




// Import the router files

const personRoutes = require('./routes/personRoutes');

const menuRoutes = require('./routes/menuRoutes');
const Person = require("./models/Person");

// Use the routers

app.use('/person',personRoutes);

app.use('/menu',menuRoutes);



app.listen(PORT, () => {
  console.log("listening on port 3000");
});

// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();

// console.log(user);

// fs.appendFile('greeting.txt','Hello deepanshu',()=>{
//     console.log('file is created');
// })
