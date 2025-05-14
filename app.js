import express from "express";
import compression from "compression";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

const allowedOrigin = process.env.NODE_ENV === "production" ? "https://workout.leemorgan.dev" : "http://localhost:8000";
let mongoString = "mongodb://127.0.0.1/workout";
if(process.env.COOKIE_SECRET){
    mongoString = `mongodb://workout:${process.env.MONGODB_PASS}@127.0.0.1:27017/workout?authSource=admin`;
}

mongoose.connect(mongoString);

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(compression());
app.use(cors({
    origin: process.env.NODE_ENV === "production" ? "https://workout.leemorgan.dev" : "http://localhost:8000",
    credentials: true
}));
app.use(express.json());

if(process.env.NODE_ENV !== "production"){
    app.listen(8000);
}
export default app;
