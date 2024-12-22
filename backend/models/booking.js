const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  id_hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel', 
    required: true,
  },
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  id_room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', 
    required: true,
  },
  check_in:{
    type: Date,
    require:true,
  },
  check_out:{
    type:Date,
    require:true,
  },
  total_cost:{
    type:Number,
    require:true,
  }
}, { timestamps: true });  

module.exports = mongoose.model('Booking', bookingSchema);
