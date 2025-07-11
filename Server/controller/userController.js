import UserModel from "../model/UserModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select("-password");
        if(!users) return res.status(404).json({error: "No users found!"});

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
}
export const getUser = async (req, res) => {
    const { userId } = req.params;

    if(!userId) return res.status(400).json({error: "User id is required!"})

     try {
        const user = await UserModel.findById(userId).select("-password");

        if(!user) return res.status(404).json({error: "No user found"});

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error);
    }
}