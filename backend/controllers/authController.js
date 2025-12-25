import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";


export const registerController = async (req,res) => {
    try{
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) return res.status(400).json({ message: 'name, email and password are required' });

        // normalize email to avoid leading/trailing spaces and case differences
        const normalizedEmail = String(email).trim().toLowerCase();

        // check if user already exists
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // hash password
        const hashed = await bcrypt.hash(password, 10);

        // Now create a new user
        const user = await User.create({ name, email: normalizedEmail, password: hashed, role });
        res.json({ message: "User registered successfully", user });

    }catch(err){
        res.status(500).json({error:err.message});
    }
};



export const loginController = async (req,res) =>{
    try{
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: 'email and password are required' });

        const normalizedEmail = String(email).trim().toLowerCase();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Invalid credentials" });

        // create jwt token
        const secret = process.env.JWT_SECRET || 'dev-secret';
        const token = jwt.sign(
            { id: user._id, role: user.role },
            secret,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, role: user.role }
        });

    }catch(err){
        res.status(500).json({error:err.message});
    }
};