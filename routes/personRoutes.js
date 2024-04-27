const express = require("express");
const router = express.Router();

const Person = require("./../models/Person");

const {jwtAuthMiddleware, generateToken} = require("./../jwt");


// POST route to add a person

router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // Assuming the req.body contains the person data

    // Create a new person document using mongoose model

    // const newPerson = new Person();

    // newPerson.name = data.name;
    // newPerson.age = data.age;
    // newPerson.work = data.work;
    // newPerson.mobile = data.mobile;
    // newPerson.email = data.email;
    // newPerson.salary = data.salary;
    // newPerson.address = data.address;

    const newPerson = new Person(data);

    // Save the new person to the database

    const response = await newPerson.save();

    console.log("data saved ", response);

    const payload = {
      id : response.id,
      username : response.username
    }

    console.log(JSON.stringify(payload));

    const token = generateToken(payload);

    console.log("token is : " , token);

    console.log("data saved successfully");

    res.status(200).json({response : response,token : token});

  } catch (err) {
    console.log("Error saving person", err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});


// Login Route 

router.post('/login', async (req,res) => {

  try{

    // Extract username and password from request body

    const {username,password} = req.body;

    // check karo ki user exist karta hai ya nahi in dataase

    const user = await Person.findOne({username : username});

    // If user does not exist or password does not match then return error

    if( !user || !( await user.comparePassword(password))){

      return res.status(401).json({error : 'Invalid username or password'});
    }

    // Now user is an authenticated user , now generate token

    const payload = {
      id : user.id,
      username : user.username,
    }

    const token = generateToken(payload);

    // return token as response 

    return res.json({token});

  }catch(err){
    console.error(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }

})


// Profile route 

router.get('/profile', jwtAuthMiddleware,async (req,res) => {

  try{
    
    const userData = req.user;

    console.log("User Data :: ",userData);

    const userId = userData.id;

    const user = await Person.findById(userId);

    res.status(200).json({user});

  }catch(err){
    console.error(err);
    res.status(500).json({
      error: "Internal server error",
    });
  }

});



// GET method to get the person

router.get("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const response = await Person.find();
    console.log("data fetched ", response);

    console.log("data fetched successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error getting person", err);
    res.status(500).json({
      error: "Internal server error",
    });
  }

  res.send();
});

// Parametrised API calls

router.get("/:workType", async (req, res) => {
  // :work is kind of a variable here

  try {
    const workTypeOFPerson = req.params.workType; // Extract the work type from the URL parameter

    if (
      workTypeOFPerson == "chef" ||
      workTypeOFPerson == "waiter" ||
      workTypeOFPerson == "manager"
    ) {
      const response = await Person.find({ work: workTypeOFPerson });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({
        error: "Invalid work type",
      });
    }
  } catch (err) {
    console.log("Error getting person work", err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});


router.put('/:personId',async (req,res) => {
  try{

      const person_id = req.params.personId; // Extract the id from the URL parameter

      const updatedPersonData = req.body;  // the updated data sent by client to update 
      
      const response = await Person.findByIdAndUpdate(person_id,updatedPersonData,{
        new : true, // Resturn the updated data after updation/changes
        runValidators : true,  // Run mongoose validation before doing updation
      });

      if( !response ){  // if response is null
        return res.status(404).json({
          error : "Person not found or do not exist",
        });
      }

      console.log("data updated");
      res.status(200).json(response);

  }catch(err){
    console.log("Error updating person ", err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.delete('/:personId',async (req,res) => {
  try{

      const person_id = req.params.personId; // Extract the id from the URL parameter
      
      const response = await Person.findByIdAndDelete(person_id);

      if( !response ){  // if response is null
        return res.status(404).json({
          error : "Person not found or do not exist",
        });
      }

      console.log("data deleted");
      res.status(200).json({message : "Person deleted successfully"});

  }catch(err){
    console.log("Error deleting person ", err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});



module.exports = router;