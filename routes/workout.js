import {
    createRoute,
    getRoute,
    addNoteRoute,
    updateWorkoutRoute,
    deleteRoute
} from "../controllers/workout.js";

import {userAuth} from "../auth.js";

export default (app)=>{
    app.post("/workout", userAuth, createRoute);
    app.get("/workout", userAuth, getRoute);
    app.put("/workout/:workoutId/note", userAuth, addNoteRoute);
    app.put("/workout/:workoutId", userAuth, updateWorkoutRoute);
    app.delete("/workout/:workoutId", userAuth, deleteRoute);
}
