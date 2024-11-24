const User = require('../models/user');

module.exports={
    createUser: async(req, res)=>{
        const newUser = new User(req.body);
        try{
            await newUser.save();
            res.status(200).json("User created successfully")
        }catch (error){
            res.status(500).json("failed to creat the successfully")
        }
    },
    updateUser: async (req, res) => {
        try {
            const userId = req.params.id; 
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: req.body }, 
                { new: true }       
            );
    
            if (!updatedUser) {
                return res.status(404).json("User not found");
            }
    
            res.status(200).json("User updated successfully");
        } catch (error) {
            console.error("Update error:", error);
            res.status(500).json("Failed to update user");
        }
    },

      
    deleteUser:async(req,res)=>{
        try {
            const user_id = req.params.id;
            console.log(user_id)
            const deleteUser = await User.findByIdAndDelete(user_id)
            if(!deleteUser){
                console.log("Not found user")
            }
        } catch (error) {
            console.error("Delete error:", error);
            res.status(500).json("Failed to delete user");
        }
    },
    

    getAllUser: async(req, res)=>{
        try{
            const users = await User.find().sort({createAt:-1})
            res.status(200).json(users)
        }catch(error){
            res.status(500).json("failed to get the users")
        }
    },

    getUser:async(req, res)=>{
        try{
            const user = await User.findById(req.params.id)
            res.status(200).json(user)
        }catch(error){
            res.status(500).json("failed to get the user")
        }
    },

    searchUser: async (req, res) => {
        try{
            const result = await User.aggregate(
                [
                    {
                      $search: {
                        index: "users",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            )
            res.status(200).json(result)
        }catch(error){
            res.status(500).json("failed to get the user")
        }
    }
    
}