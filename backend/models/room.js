const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  id_hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel', 
    required: true,
  },
  room_number: {
    type: String,
    required: true,
  },
  room_type: {
    type: String,
    required: true,  
  },
  price_per_night: {
    type: Number,
    required: true,  
  },
  availability: { type: Boolean, required: true },
  capacity: {
    type: Number,
    required: true,  
  },
  roomImages: {
    type: String, 
  }
}, { timestamps: true });  

module.exports = mongoose.model('Room', roomSchema);
