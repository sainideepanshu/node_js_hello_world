const express = require("express");
const router = express.Router();

const MenuItem = require("./../models/MenuItem");


// POST method to add a menu item

router.post("/", async (req, res) => {
    try {
      const data = req.body; // Assuming the req.body contains the person data
  
      // Create a new person document using mongoose model
  
      const newMenu = new MenuItem(data);
  
      // Save the new person to the database
  
      const response = await newMenu.save();
  
      console.log("data saved ", response);
  
      console.log("data saved successfully");
      res.status(200).json(response);
    } catch (err) {
      console.log("Error saving menu", err);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  });
  
  // GET method to get the menu items
  
  router.get('/',async (req,res) => {
      
    try{
  
        const response = await MenuItem.find();
        console.log("data fetched ", response);
  
        console.log("data fetched successfully");
        res.status(200).json(response);
  
    }catch(err){
        console.log("Error getting menu", err);
        res.status(500).json({
        error: "Internal server error",
        });
    }
  
    res.send();
  });


  module.exports = router;