import User from "./models/User.js";

import {HttpError, catchError} from "./HttpError.js";
import jwt from "jsonwebtoken";

const userAuth = async (req, res, next)=>{
    try{
        const userData = jwt.verify(req.signedCookies.userToken, process.env.JWT_SECRET);
        
        const user = await User.findOne({_id: userData.id});
        if(!user || user.uuid !== userData.token){
            throw new HttpError(401, "Unauthorized");
        }

        res.locals.user = user;
        next();
    }catch(e){
        if(e.message === "Cannot read properties of undefined (reading 'split')"){
            const error = new CustomError(400, "Must provide authorization token");
            catchError(error, req, res, next);
            return;
        }

        if(e.message === "jwt malformed"){
            const error = new CustomError(400, "Invalid JWT");
            catchError(error, req, res, next);
            return;
        }

        catchError(e, req, res, next);
    }
}

export {userAuth}
