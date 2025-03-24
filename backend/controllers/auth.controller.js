import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password don't match" })
        }

        const user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ message: "User already exist" })
        }

        // hash the password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        // create new user
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });
        // generate jwt token here
        generateTokenAndSetCookie(newUser._id, res)
        if (newUser) {
            await newUser.save();

            res.status(201).json({
                message: "User created successfully", user: {
                    _id: newUser._id,
                    fullName,
                    username,
                    password,
                    gender,
                }
            })
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }


    } catch (error) {
        console.log("Error in signup controller", error)
        res.status(500).json({ message: "Internal server error" })
    }
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        const isPasswordValid = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPasswordValid) {
            res.status(400).json({ message: "Invalid username and password" })
        }

        generateTokenAndSetCookie(user._id, res)
        res.status(400).json({
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






