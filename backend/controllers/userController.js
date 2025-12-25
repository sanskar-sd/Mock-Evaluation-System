import User from "../models/user.js";

export const getusers = async(req,res) => {
    const users=await User.find({});
    res.json(users);
}
