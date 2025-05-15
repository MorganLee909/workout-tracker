import {
    createRoute,
    getRoute
} from "../controllers/workout.js";

import {userAuth} from "../auth.js";

export default (app)=>{
    app.post("/workout", userAuth, createRoute);
    app.get("/workout", userAuth, getRoute);
}
