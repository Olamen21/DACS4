const path = require('path');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const Hotel = require('../models/hotel');
const stream = require('stream'); 
const { error } = require('console');

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });
module.exports = {
    createHotel: async (req, res) => {
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
            const newHotel = new Hotel({
                nameHotel: req.body.nameHotel, // Lưu ý phải đúng tên field
                address: req.body.address,
                contactNumber: req.body.contactNumber,
                email: req.body.email,
                description: req.body.description,
                id_city: req.body.id_city,
                amenities: req.body.amenities,
                total_rooms: req.body.total_rooms,
                booked_rooms: req.body.booked_rooms,
                available_rooms: req.body.available_rooms,
                imageUrl: result.secure_url, 
            });

            // Lưu vào MongoDB
            await newHotel.save();
            res.status(200).json({ message: "Hotel created successfully", hotel: newHotel });
        } catch (error) {
            console.error("Create Hotel Error:", error);
            res.status(500).json({ error: error.message });
        }
    },



    updateHotel: async (req, res) => {
        try {
            console.log("Request body:", req.body); 
            console.log("Request file:", req.file); 
    
            const { id } = req.params; // Hotel ID from URL parameters
    
            // Find the hotel by ID
            const hotel = await Hotel.findById(id);
            if (!hotel) {
                return res.status(404).json({ error: "Hotel not found" });
            }
    
            let imageUrl = hotel.imageUrl; // Default to existing image URL
    
            // If a new file is uploaded, handle the Cloudinary upload
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
    
            // Update hotel fields with request data
            hotel.nameHotel = req.body.nameHotel || hotel.nameHotel;
            hotel.address = req.body.address || hotel.address;
            hotel.contactNumber = req.body.contactNumber || hotel.contactNumber;
            hotel.email = req.body.email || hotel.email;
            hotel.description = req.body.description || hotel.description;
            hotel.id_city = req.body.id_city || hotel.id_city;
            hotel.amenities = req.body.amenities || hotel.amenities;
            hotel.total_rooms = req.body.total_rooms || hotel.total_rooms;
            hotel.booked_rooms = req.body.booked_rooms || hotel.booked_rooms;
            hotel.available_rooms = req.body.available_rooms || hotel.available_rooms;
            hotel.imageUrl = imageUrl;
    
            // Save the updated hotel
            await hotel.save();
            res.status(200).json({ message: "Hotel updated successfully", hotel });
        } catch (error) {
            console.error("Update Hotel Error:", error);
            res.status(500).json({ error: error.message });
        }
    },
    
    
    deleteHotel: async (req, res) => {
        try {
            const hotel_id = req.params.id;
            console.log(hotel_id)
            const deleteHotel = await Hotel.findByIdAndDelete(hotel_id)
            if (!deleteHotel) {
                console.log("Not found hotel")
            }
        } catch (error) {
            console.error("Delete error:", error);
            res.status(500).json("Failed to delete hotel");
        }
    },


    getAllHotel: async (req, res) => {
        try {
            const hotels = await Hotel.find().sort({ createAt: -1 })
            res.status(200).json(hotels)
        } catch (error) {
            res.status(500).json("failed to get the hotels")
        }
    },

    getHotel: async (req, res) => {
        try {
            const hotel = await Hotel.findById(req.params.id)
            res.status(200).json(hotel)
        } catch (error) {
            res.status(500).json("failed to get the user")
        }
    },

}