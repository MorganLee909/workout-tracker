import {HttpError} from "../HttpError.js";

export default (data)=>{
    if(data.name) validateName(data.name);
    if(data.emai) validateEmail(data.email);
    if(data.pass) validatePass(data.pass, data.confirmPass);
}

const validateName = (name)=>{
    if(typeof(name) !== "string") throw new HttpError(400, "Invalid name");
    if(name.length < 3) throw new HttpError(400, "Name must contain at least 3 characters");
}

const validateEmail = (email)=>{
    email = email.toLowerCase();
    if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email) !== true){
        throw new HttpError(400, "Invalid email");
    }
}

const validatePass = (pass, confirmPass)=>{
    if(pass.length < 10) throw new HttpError(400, "Password must contain at least 10 characters");
    if(pass !== confirmPass) throw new HttpError(400, "Passwords do not match");
}
