import {
    createRoute,
    getRoute,
    getAllRoute
} from "../controllers/session.js";

import {userAuth} from "../auth.js";

export default (app)=>{
    app.post("/session", userAuth, createRoute);
    app.get("/session/:workoutId", userAuth, getRoute);
    app.get("/session/:workoutId/all", userAuth, getAllRoute);
}
