import {
    createRoute,
    getRoute
} from "../controllers/session.js";

import {userAuth} from "../auth.js";

export default (app)=>{
    app.post("/session", userAuth, createRoute);
    app.get("/session/:workoutId", userAuth, getRoute);
}
