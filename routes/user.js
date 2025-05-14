import {
    createRoute,
    loginRoute,
    logoutRoute,
    getRoute
} from "../controllers/user.js";

import {userAuth} from "../auth.js";

export default (app)=>{
    app.post("/user", createRoute);
    app.put("/user/login", loginRoute);
    app.get("/user/logout", logoutRoute);
    app.get("/user", userAuth, getRoute);
}
