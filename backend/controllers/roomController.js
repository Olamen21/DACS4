const mongoose = require('mongoose');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const stream = require('stream'); 
const { error } = require('console');

const Room = require('../models/room')
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports={
    createRoom: async(req, res)=>{
        try {
            console.log("Request body:", req.body); 
        console.log("Request file:", req.file); 

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Tạo stream từ buffer
        const bufferStream = new stream.PassThrough();
        bufferStream.end(req.file.buffer);

        // Upload ảnh lên Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'image' },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        return reject(error);
                    }
                    resolve(result);
                }
            );
            bufferStream.pipe(uploadStream);
        });
         // Tạo đối tượng Hotel mới
         const newRoom = new Room({
            id_hotel: req.body.id_hotel, // Lưu ý phải đúng tên field
            room_number: req.body.room_number,
            room_type: req.body.room_type,
            price_per_night: req.body.price_per_night,
            availability: true,
            capacity: req.body.capacity,
            roomImages: result.secure_url, 
        }); 

        await newRoom.save();
        res.status(200).json({ message: "Room created successfully", room: newRoom });
        } catch (error) {
            console.error("Create Room Error:", error);
            res.status(500).json({ error: error.message });
        }
    },
    updateRoom: async (req, res) => {
        try {
            console.log("Request body:", req.body); 
            console.log("Request file:", req.file); 
    
            const { id } = req.params;
            const room = await Room.findById(id);
            if (!room) {
                return res.status(404).json({ error: "Room not found" });
            }
    
            let imageUrl = room.imageUrl;

            if (req.file) {
                const bufferStream = new stream.PassThrough();
                bufferStream.end(req.file.buffer);
    
                const uploadResult = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { resource_type: 'image' },
                        (error, result) => {
                            if (error) {
                                console.error("Cloudinary upload error:", error);
                                return reject(error);
                            }
                            resolve(result);
                        }
                    );
                    bufferStream.pipe(uploadStream);
                });
    
                imageUrl = uploadResult.secure_url; // Update with new image URL
            }

            room.room_type = req.body.room_type || room.room_type;
            room.price_per_night = req.body.price_per_night || room.price_per_night;
            room.availability = req.body.availability || room.availability;
            room.capacity = req.body.capacity || room.capacity;
            room.roomImages = imageUrl;
            await room.save();
            res.status(200).json({ message: "Room updated successfully", room });
        } catch (error) {
            console.error("Update error:", error);
            res.status(500).json("Failed to update room");
        }
    },

      
    deleteRoom:async(req,res)=>{
        try {
            const room_id = req.params.id;
            const deleteRoom = await Room.findByIdAndDelete(room_id)
            if(!deleteRoom){
                console.log("Not found room")
            }
        } catch (error) {
            console.error("Delete error:", error);
            res.status(500).json("Failed to delete room");
        }
    },
    

    getAllRoom: async(req, res)=>{
        try{
            const rooms = await Room.find().sort({createAt:-1})
            res.status(200).json(rooms)
        }catch(error){
            res.status(500).json("failed to get the rooms")
        }
    },

    getRoom:async(req, res)=>{
        try{
            const room = await Room.findById(req.params.id)
            res.status(200).json(room)
        }catch(error){
            res.status(500).json("failed to get the room")
        }
    },

    searchNumberRoom: async (req, res) => {
        try {
          const { key } = req.params;
      
          // Kiểm tra giá trị của key
          if (!key || typeof key !== 'string' || key.trim() === '') {
            return res.status(400).json({ message: "Invalid search key" });
          }
      
          // Chuyển key thành chuỗi rõ ràng
          const keyString = String(key);
      
          // Tìm kiếm phòng theo room_number
          const rooms = await Room.find({
            room_number: { $regex: keyString, $options: 'i' },
          });
      
          if (rooms.length === 0) {
            return res.status(404).json({ message: "No rooms found with the given key" });
          }
      
          res.status(200).json(rooms);
        } catch (error) {
          if (error.name === 'BSONError') {
            return res.status(400).json({ message: "Invalid search key format" });
          }
          console.error("Search error:", error);
          res.status(500).json({ message: "Failed to search for rooms", error: error.message });
        }
      },
      
      
    searchRoom: async (req, res) => {
        try {
            const { id_hotel } = req.params; // Lấy id_hotel từ params

            
            if (!id_hotel) {
                return res.status(400).json({ message: 'id_hotel parameter is required' });
            }
    
            // Chuyển đổi id_hotel thành ObjectId hợp lệ
            const objectId = new mongoose.Types.ObjectId(id_hotel);
    
            // Tìm tất cả các phòng có id_hotel tương ứng
            const rooms = await Room.find({ id_hotel: objectId });
    
            // Kiểm tra nếu không tìm thấy phòng nào
            if (rooms.length === 0) {
                return res.status(404).json({ message: 'No rooms found for the given hotel' });
            }
    
            // Trả về danh sách phòng tìm được
            res.status(200).json(rooms);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Failed to get the rooms', error });
        }
    }
    
}