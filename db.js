const mongoose = require('mongoose');

// Define the Mongo db connection URL

const mongoURL = 'mongodb://127.0.0.1:27017/hotels';  //hotels is the database name


// Setup Mongo db connection

mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

// Get the default connection
// Mongoose maintains a default connection object representing the mongoDB connection

const db = mongoose.connection;


// Define event listener for database connection

db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})

db.on('error',(err)=>{
    console.error('MongoDB conection error',err);
})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})


// Exports the database connection

module.exports = db;