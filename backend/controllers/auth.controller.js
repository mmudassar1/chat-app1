import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, gender } = req.body;

        if (!fullName || !username || !password || !gender) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: `https://avatar.iran.liara.run/public/${gender === "male" ? "boy" : "girl"}`
        });

        const savedUser = await newUser.save();

        if (!savedUser) {
            throw new Error("Error creating user");
        }

        // Return user without password
        const { password: pass, ...rest } = savedUser.toObject();
        
        res.status(201).json({
            message: "User created successfully",
            user: rest
        });

    } catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        const isPasswordValid = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPasswordValid) {
            res.status(400).json({ message: "Invalid username and password" })
        }

        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            message: "User logged in successfully",
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("Error in signup controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
export const logout = (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logged out function", error)
        res.status(400).json({message:"Internal server error"})
    }
}






