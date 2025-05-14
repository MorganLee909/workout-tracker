import {
    createRoute,
    loginRoute
} from "../controllers/user.js";

export default (app)=>{
    app.post("/user", createRoute);
    app.put("/user/login", loginRoute);
}
