const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const Person = require("./models/Person");




passport.use(new LocalStrategy(async (userName,passWord,done) => {

    // Authentication logic here
  
    try{
  
      console.log('Recieved credentials : ',userName,passWord);
  
      const user = await Person.findOne({username : userName});
  
      if(!user){  // if user is null i.e. can't find user in database
  
        return done(null,false,{message : 'Incorrect username '});
      }
  
      // Now if user is not null and present in database then we will match password with the password of user present in database 
  
    
      const isPasswordMatch = await user.comparePassword(passWord);

  
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


  module.exports = passport; // Export configured passport