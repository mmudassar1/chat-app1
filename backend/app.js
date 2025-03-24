import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import userRoutes from "./routes/user.route.js"
import connectToMongoDB from "./db/connectToMongoDB.js.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()

const port = process.env.PORT || 5000

// middleware
app.use(cookieParser())
app.use(express.json()) // to parse incoming request with json payloads from req.body

// routes
app.use("/api/auth" , authRoutes)
app.use("/api/messages" , messageRoutes)
app.use("/api/users" , userRoutes)

app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
    connectToMongoDB()
})