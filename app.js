import express from "express";
import compression from "compression";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import esbuild from "esbuild";

import {catchError} from "./HttpError.js";

import otherRoutes from "./routes/other.js";
import userRoutes from "./routes/user.js";

let mongoString = "mongodb://127.0.0.1/workout";
if(process.env.NODE_ENV === "production"){
    mongoString = `mongodb://workout:${process.env.MONGODB_PASS}@127.0.0.1:27017/workout?authSource=admin`;
}

mongoose.connect(mongoString);
global.cwd = import.meta.dirname;

esbuild.build({
    entryPoints: [`${global.cwd}/views/index.js`, `${global.cwd}/views/index.css`],
    bundle: true,
    outdir: `${global.cwd}/views/build/`
});

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(compression());
app.use(cors({
    origin: process.env.NODE_ENV === "production" ? "https://workout.leemorgan.dev" : "http://localhost:8000",
    credentials: true
}));
app.use(express.json());

otherRoutes(app);
userRoutes(app);

app.use(catchError);

if(process.env.NODE_ENV !== "production"){
    app.listen(8000);
}
export default app;
