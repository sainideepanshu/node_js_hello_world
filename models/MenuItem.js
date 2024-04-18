const mongoose = require("mongoose");

// Define menu schema

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ['sweet','spicy','sour'],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});


// Now we will create model using the schema created above

const MenuItem = mongoose.model('MenuItem',menuItemSchema);

module.exports = MenuItem;

