import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import router from "./router/index.js";
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000


// Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())


// Router
app.use('/', router)
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('DB connected successfully')
        app.listen(PORT, () => console.log(`server started successfully on port: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()