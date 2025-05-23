import Session from "../models/Session.js";
import Workout from "../models/Workout.js";

import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const createRoute = async (req, res, next)=>{
    try{
        const session = createSession(req.body);
        await session.save();
        res.json(responseSession(session));
    }catch(e){next(e)}
}

const getRoute = async (req, res, next)=>{
    try{
        const [workout, sessions] = await Promise.all([
            Workout.findOne({_id: req.params.workoutId}),
            Session.aggregate([
                {$match: {workout: new ObjectId(req.params.workoutId)}},
                {$sort: {start: -1}},
                {$limit: 5}
            ])
        ]);
        confirmWorkoutOwnership(workout, res.locals.user);
        res.json(sessions.map(s => responseSession(s)));
    }catch(e){next(e)}
}

const getAllRoute = async (req, res, next)=>{
    try{
        const [workout, sessions] = await Promise.all([
            Workout.findOne({_id: req.params.workoutId}),
            Session.aggregate([
                {$match: {workout: new ObjectId(req.params.workoutId)}},
                {$sort: {start: -1}}
            ])
        ]);
        confirmWorkoutOwnership(workout, res.locals.user);
        res.json(sessions.map(s => responseSession(s)));
    }catch(e){next(e)}
}

/*
 Create a new Session object
 @param {Object} - Body data from the object
 @return {Session} - Newly created Session object
 */
const createSession = (data)=>{
    return new Session({
        workout: data.workout,
        start: new Date(data.start),
        end: new Date(data.end),
        exercises: data.exercises
    });
}

/*
 Throw error if user does now own workout
 @param {Workout} workout - Workout object
 @param {User} user - User object
 */
const confirmWorkoutOwnership = (workout, user)=>{
    if(workout.user.toString() !== user._id.toString()){
        throw new HttpError(403, "Unauthorized");
    }
}

/*
 Create modified Session for sending to frontend
 @param {Session} - Session object
 @return {Object} - Modified session object
 */
const responseSession = (session)=>{
    return {
        id: session._id,
        workout: session.workout,
        start: session.start,
        end: session.end,
        exercises: session.exercises
    };
}

export {
    createRoute,
    getRoute,
    getAllRoute
}
