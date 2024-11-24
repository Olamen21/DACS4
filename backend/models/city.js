const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    unique: true,   
  },
  img: {
    type: String,    
    required: false,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('City', CitySchema);
