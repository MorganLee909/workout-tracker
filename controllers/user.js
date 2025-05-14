import User from "../models/User.js";

import {HttpError} from "../HttpError.js";
import validate from "../validation/user.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const createRoute = async (req, res, next)=>{
    try{
        validate(req.body);
        const user = await createUser(req.body);
        await user.save();
        res.json({success: true});
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
