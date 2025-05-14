import User from "../models/User.js";

import {HttpError} from "../HttpError.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const createRoute = async (req, res, next)=>{
    try{
        const user = await createUser(req.body);
        await user.save();
        res.json(responseUser(user));
    }catch(e){next(e)}
}

/*
 Create a new User object
 @param {Object} - Request body with user data
 @return {User} - User object
 */
const createUser = async (data)=>{
    return new User({
        name: data.name,
        email: data.email.toLowerCase(),
        password: await hashPass(data.pass),
        workouts: [],
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
    createRoute
}
