const Booking = require('../models/booking');
const mongoose = require('mongoose');
module.exports={
    createBooking: async(req, res)=>{
        const newBooking = new Booking(req.body);
        try{
            await newBooking.save();
            res.status(200).json("Booking created successfully")
        }catch (error){
            res.status(500).json("failed to creat the successfully")
        }
    },
    
    deleteBooking:async(req,res)=>{
        try {
            const booking_id = req.params.id;
            console.log(booking_id)
            const deleteBooking = await Booking.findByIdAndDelete(booking_id)
            if(!deleteBooking){
                console.log("Not found booking")
            }
        } catch (error) {
            console.error("Delete error:", error);
            res.status(500).json("Failed to delete booking");
        }
    },
    

    getAllBooking: async(req, res)=>{
        try{
            const bookings = await Booking.find().sort({createAt:-1})
            res.status(200).json(bookings)
        }catch(error){
            res.status(500).json("failed to get the bookings")
        }
    },

    getBooking:async(req, res)=>{
        try{
            const booking = await Booking.findById(req.params.id)
            res.status(200).json(booking)
        }catch(error){
            res.status(500).json("failed to get the booking")
        }
    },

    searchBooking: async (req, res) => {
        try {
            const { id_user } = req.params;

            
            if (!id_user) {
                return res.status(400).json({ message: 'id_user parameter is required' });
            }
    
            
            const objectId = new mongoose.Types.ObjectId(id_user);
    
         
            const bookings = await Booking.find({ id_user: objectId });
    
            
            if (bookings.length === 0) {
                return res.status(404).json({ message: 'No bookings found for the given user' });
            }
    
           
            res.status(200).json(bookings);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Failed to get the bookings', error });
        }
    }
    
    
}