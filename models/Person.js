const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


// Define person schema

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ['chef','waiter','manager'],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


personSchema.pre('save',async function(next){

  const person = this;

  // hash the password only if it has been modified or is new

  if(!person.isModified('password')){  // agar hum maan lo salary modify kar rahe hai to us case m password hash karne ki koi zarurat nahi hai
    return next();
  }

  try{

    // hash password generation

    const salt = await bcrypt.genSalt(10);

    // hash password 

    const hashedPassword = await bcrypt.hash(person.password,salt);

    // override the plain password with the hashed one

    person.password = hashedPassword;

    next();

  }catch(err){
    return next(err);
  }

});


personSchema.methods.comparePassword = async function(candidatePassword){

  try{

    // use bcrypt to compare the provided password with the hashed password stored in database

    const isMatch = await bcrypt.compare(candidatePassword,this.password);

    return isMatch;

  }catch(err){

    throw err;
  }

}

// Now we will create model using the schema created above

const Person = mongoose.model('Person',personSchema);

module.exports = Person;

