import Workout from "../models/Workout.js";

import {HttpError} from "../HttpError.js";

const createRoute = async (req, res, next)=>{
    try{
        const workout = createWorkout(req.body, res.locals.user._id);
        await workout.save();
        res.json(responseWorkout(workout));
    }catch(e){next(e)}
}

const getRoute = async (req, res, next)=>{
    try{
        const workouts = await Workout.find({user: res.locals.user._id});
        res.json(workouts.map(w => responseWorkout(w)));
    }catch(e){next(e)}
}

const addNoteRoute = async (req, res, next)=>{
    try{
        const workout = await Workout.findOne({_id: req.params.workoutId});
        confirmOwnership(workout, res.locals.user);
        const exercise = findExercise(workout, req.body.exercise);
        exercise.notes = req.body.note;
        await workout.save();
        res.json(responseWorkout(workout));
    }catch(e){next(e)}
}

/*
 Create a new Workout object
 @param {Object} - Body data from the request
 @param {ObjectId} userId - ID of the user creating the workout
 @return {Workout} - Workout object
 */
const createWorkout = (data, userId)=>{
    return new Workout({
        user: userId,
        name: data.name,
        exercises: data.exercises
    });
}

/*
 Throw error if user does not own workout
 @param {Workout} workout - Workout object
 @param {User} user - User object
 */
const confirmOwnership = (workout, user)=>{
   if(workout.user.toString() !== user._id.toString()){
       throw new HttpError(403, "Unauthorized");
   }
}

/*
 Retrieve a single exercise from a workout
 @param {Workout} workout - Workout object
 @param {String} exerciseId - ID of the exercise to retrieve
 @return {Object} - Exercise object
 */
const findExercise = (workout, exerciseId)=>{
    for(let i = 0; i < workout.exercises.length; i++){
        if(workout.exercises[i]._id.toString() === exerciseId){
            return workout.exercises[i];
        }
    }
    return null;
}

/*
 Create a new workout object for sending to the frontend
 @param {Workout} workout - Workout object
 @return {Object} - Modified Workout object
 */
const responseWorkout = (workout)=>{
    return {
        id: workout._id,
        name: workout.name,
        exercises: workout.exercises
    };
}

export {
    createRoute,
    getRoute,
    addNoteRoute
}
