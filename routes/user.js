import {
    createRoute,
    loginRoute,
    logoutRoute
} from "../controllers/user.js";

export default (app)=>{
    app.post("/user", createRoute);
    app.put("/user/login", loginRoute);
    app.get("/user/logout", logoutRoute);
}
