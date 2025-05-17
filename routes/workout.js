import {
    createRoute,
    getRoute,
    addNoteRoute,
    updateWorkoutRoute
} from "../controllers/workout.js";

import {userAuth} from "../auth.js";

export default (app)=>{
    app.post("/workout", userAuth, createRoute);
    app.get("/workout", userAuth, getRoute);
    app.put("/workout/:workoutId/note", userAuth, addNoteRoute);
    app.put("/workout/:workoutId", userAuth, updateWorkoutRoute);
}
