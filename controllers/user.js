import User from "../models/User.js";

import {HttpError} from "../HttpError.js";
import validate from "../validation/user.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const createRoute = async (req, res, next)=>{
    try{
        validate(req.body);
        const user = await createUser(req.body);
        await user.save();
        res.json({success: true});
    }catch(e){next(e)}
}

const loginRoute = async (req, res, next)=>{
    try{
        const user = await User.findOne({email: req.body.email.toLowerCase()});
        if(user === null) throw new HttpError(400, "Invalid credentials");
        await comparePass(req.body.pass, user.password);
        const token = createToken(user);
        setCookie(res, "userToken", token);
        res.json(responseUser(user));
    }catch(e){next(e)}
}

const logoutRoute = async (req, res, next)=>{
    try{
        res.clearCookie("userToken");
        res.json({success: true});
    }catch(e){next(e)}
}

const getRoute = async (req, res, next)=>{
    try{
        res.json(res.locals.user);
    }catch(e){next(e)}
}

/*
 Create a new User object
 @param {Object} - Request body with user data
 @return {User} - User object
 */
const createUser = async (data)=>{
    const email = data.email.toLowerCase();
    const user = await User.findOne({email: email});
    if(user !== null) throw new HttpError(400, "User with this email already exists");

    return new User({
        name: data.name,
        email: email,
        password: await hashPass(data.pass),
        uuid: createUuid()
    });
}

/*
 Hash a password
 @param {String} - Password to hash
 @return {String} - Hashed password
 */
const hashPass = async (password)=>{
    return await bcrypt.hash(password, 10);
}

/*
 Throw error if password does not match
 @param {String} password - Password to compare
 @param {String} hashedPass - Hashed password from database
 */
const comparePass = async (password, hashedPass)=>{
    const result = await bcrypt.compare(password, hashedPass);
    if(result !== true) throw new HttpError(400, "Invalid credentials");
}

/*
 Create an authorization token for the user
 @param {User} user - User object
 @return {String} - User auth token
 */
const createToken = (user)=>{
    return jwt.sign({
        id: user._id,
        token: user.uuid
    }, process.env.JWT_SECRET);
}

/*
 Set a cookie
 @param {Response} res - Response object containing the 'cookie' method
 @param {String} name - Name of the cookie to set
 @param {String} value - Value of the cookie
 */
const setCookie = (res, name, value)=>{
    res.cookie(name, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true
    });
}

/*
 Create user object for sending to frontend
 @param {User} - User object
 @return {User} - Modified User object
 */
const responseUser = (user)=>{
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        workouts: user.workouts
    };
}

/*
 Create a new UUID token
 @return {String} - UUID token
 */
const createUuid = ()=>{
    return crypto.randomUUID();
}

export {
    createRoute,
    loginRoute,
    logoutRoute,
    getRoute
}
