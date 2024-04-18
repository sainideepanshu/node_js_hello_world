const express = require("express");
const app = express();
const db = require("./db");

require('dotenv').config();


const PORT = process.env.PORT || 3000;

const bodyParser = require("body-parser"); // body-parser is a middleware
app.use(bodyParser.json()); // req.body

const MenuItem = require("./models/MenuItem");


app.get("/", function (req, res) {
  res.send("Welcome to my Hotel");
});




// Import the router files

const personRoutes = require('./routes/personRoutes');

const menuRoutes = require('./routes/menuRoutes');

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
