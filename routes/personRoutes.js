const express = require("express");
const router = express.Router();

const Person = require("./../models/Person");


// POST route to add a person

router.post("/", async (req, res) => {
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

    console.log("data saved successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error saving person", err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// GET method to get the person

router.get("/", async (req, res) => {
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