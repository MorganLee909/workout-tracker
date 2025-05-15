import {
    createRoute
} from "../controllers/workout.js";

import {userAuth} from "../auth.js";

export default (app)=>{
    app.get("/workout", userAuth, createRoute);
}
