import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "15d",
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, //  prevent xss cross site scripting attack
        sameSite: "strict", // prevent CSRF cross site request forgery attacks
        secure: process.env.NODE_ENV !== "production", // set to true in production
    })
}

export default generateTokenAndSetCookie;