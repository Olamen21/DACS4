const mongoose = require('mongoose')

const HotelSchema = new mongoose.Schema({
    nameHotel:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    contactNumber:{
        type:String,
        require:true,
    },
    imageUrl:{ 
        type: String, 
    },
    email:{
        type:String,
        require:true,
    },
    id_city:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City', 
        required: true, 
    },
    description:{
        type:String,
        require:true,
    },
    amenities:{
        type:String,
        require:true,
    },
    total_rooms:{
        type:Number,
        require:false,
    },
    booked_rooms:{
        type:Number,
        require:false,
    },
    available_rooms:{
        type:Number,
        require:false,
    }
})
module.exports = mongoose.model('Hotel', HotelSchema);