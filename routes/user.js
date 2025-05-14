import {
    createRoute
} from "../controllers/user.js";

export default (app)=>{
    app.post("/user", createRoute);
}
