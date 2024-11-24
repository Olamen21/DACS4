const City = require('../models/city');

module.exports={
    createCity: async (req, res) => {
        try {
            const newCity = new City({
                name: req.body.name, 
                img: req.body.img  
            });
    
            // Lưu thành phố vào cơ sở dữ liệu
            await newCity.save();
    
            res.status(200).json({ message: "City created successfully", city: newCity });
        } catch (error) {
            console.error("Error creating city:", error);
            res.status(500).json({ message: "Failed to create the city", error: error.message });
        }
    },
    
    updateCity: async (req, res) => {
        try {
            const cityId = req.params.id; 
            const updatedCity = await User.findByIdAndUpdate(
                cityId,
                { $set: req.body }, 
                { new: true }       
            );
    
            if (!updatedCity) {
                return res.status(404).json("City not found");
            }
    
            res.status(200).json("City updated successfully");
        } catch (error) {
            console.error("Update error:", error);
            res.status(500).json("Failed to update City");
        }
    },

      
    deleteCity:async(req,res)=>{
        try {
            const City_id = req.params.id;
            console.log(City_id)
            const deleteCity = await City.findByIdAndDelete(City_id)
            if(!deleteCity){
                console.log("Not found City")
            }
        } catch (error) {
            console.error("Delete error:", error);
            res.status(500).json("Failed to delete City");
        }
    },
    

    getAllCity: async(req, res)=>{
        try{
            const citys = await City.find().sort({createAt:-1})
            res.status(200).json(citys)
        }catch(error){
            res.status(500).json("failed to get the City")
        }
    },

    getCity:async(req, res)=>{
        try{
            const city = await City.findById(req.params.id)
            res.status(200).json(city)
        }catch(error){
            res.status(500).json("failed to get the City")
        }
    },
}