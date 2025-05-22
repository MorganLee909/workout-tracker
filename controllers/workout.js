import Workout from "../models/Workout.js";
import Session from "../models/Session.js";

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
        const exercise = findExercise(workout.exercises, req.body.exercise);
        exercise.notes = req.body.note;
        await workout.save();
        res.json(responseWorkout(workout));
    }catch(e){next(e)}
}

const updateWorkoutRoute = async (req, res, next)=>{
    try{
        const workout = await Workout.findOne({_id: req.params.workoutId});
        workout.exercises = updateExercises(workout.exercises, req.body);
        await workout.save();
        res.json(responseWorkout(workout));
    }catch(e){next(e)}
}

const deleteRoute = async (req, res, next)=>{
    try{
        const workout = await Workout.findOne({_id: req.params.workoutId});
        confirmOwnership(workout, res.locals.user);
        const wp = Workout.deleteOne({_id: workout._id});
        const sp = Session.deleteMany({workout: workout._id});
        await Promise.all([wp, sp]);
        res.json({success: true});
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
const findExercise = (exercises, exerciseId)=>{
    for(let i = 0; i < exercises.length; i++){
        if(exercises[i]._id.toString() === exerciseId){
            return exercises[i];
        }
    }
    return null;
}

/*
 Update the order of exercises
 @param {Workout} workout - Workout object
 @param {Object} data - Request data containing exercise information
 @return {[Object]} - Array of updated exercises
 */
const updateExercises = (exercises, data)=>{
    const newExercises = [];
    const existingIndices = [];
    for(let i = 0; i < data.existingExercises.length; i++){
        if(data.existingExercises[i].id){
            const j = exercises.findIndex(e => e._id.toString() === data.existingExercises[i].id);
            newExercises.push(exercises[j]);
            existingIndices.push(j);
        }else if(data.existingExercises[i].new){
            newExercises.push({
                name: data.existingExercises[i].new,
                notes: "",
                type: data.existingExercises[i].type,
                archived: false
            });
        }
    }

    for(let i = 0; i < exercises.length; i++){
        if(existingIndices.includes(i)) continue;

        exercises[i].archived = true;
        newExercises.push(exercises[i]);
    }

    return newExercises;
}

/*
 Create a new workout object for sending to the frontend
 @param {Workout} workout - Workout object
 @return {Object} - Modified Workout object
 */
const responseWorkout = (workout)=>{
    const data = {
        id: workout._id,
        name: workout.name,
        exercises: []
    };

    for(let i = 0; i < workout.exercises.length; i++){
        if(workout.exercises[i].archived) continue;
        data.exercises.push(workout.exercises[i]);
    }

    return data;
}

export {
    createRoute,
    getRoute,
    addNoteRoute,
    updateWorkoutRoute,
    deleteRoute
}
