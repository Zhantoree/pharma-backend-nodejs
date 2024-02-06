import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import router from "./router/index.js";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from "./router/authRouter.js";
import errorMiddleware from "./middleware/error-middleware.js";
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use(errorMiddleware)

// Router
app.use('/', router)
app.use('/auth/', authRouter)


const start = async () => {
    try {
        const newDate = new Date()
        console.log(newDate)
        console.log(newDate.toString())

        await mongoose.connect(process.env.DB_URL)
        console.log('DB connected successfully')
        app.listen(PORT, () => console.log(`server started successfully on port: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()