import user from "../model/userModel.js";

// Create a new user
export const create = async (req, res) => {
    try {
        const userData = new user(req.body);
        const { email } = userData;

        // Check if the user already exists
        const userExist = await user.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Save new user
        const savedUser = await userData.save();
        res.status(200).json(savedUser);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server error." });
    }
};

// Fetch all users
export const fetch = async (req, res) => {
    try {
        const users = await user.find();

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server error." });
    }
};

//Fetch a user by ID
export const fetchById = async (req, res) => {
    try {
        const id= req.params.id;
        const userData = await user.findById({ _id:id});
// check if the user exists 
        if (!userData) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(userData);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server error." });
    }
};

// Update a user by ID
export const update = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if the user exists
        const userExist = await user.findOne({ _id:id});
        if (!userExist) {
            return res.status(404).json({ message: "User not found." });
        }

        // Update the user
        const updatedUser = await user.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server error." });
    }
};  

//Delete a user 
export const deleteUser = async (req, res)=>{
    try{
        const id = req.params.id;

        // Check if the user exists
        const userExist = await user.findOne({ _id:id});
        if (!userExist) {
            return res.status(404).json({ message: "User not found." });
        }
        await user.findByIdAndDelete(id);
        res.status(201).json({message:"User deleted successfully"});



    }catch(error){
        res.status(500).json({ error: "Internal Server error." });

    }

};
