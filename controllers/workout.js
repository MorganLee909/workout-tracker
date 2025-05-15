import Workout from "../models/Workout.js";

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
        res.json(workouts);
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
 Create a new workout object for sending to the frontend
 @param {Workout} workout - Workout object
 @return {Object} - Modified Workout object
 */
const responseWorkout = (workout)=>{
    return {
        name: workout.name,
        exercises: workout.exercises
    };
}

export {
    createRoute,
    getRoute
}
