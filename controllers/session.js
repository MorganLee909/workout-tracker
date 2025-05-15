import Session from "../models/Session.js";

const createRoute = async (req, res, next)=>{
    try{
        const session = createSession(req.body);
        await session.save();
        res.json(responseSession(session));
    }catch(e){next(e)}
}

/*
 Create a new Session object
 @param {Object} - Body data from the object
 @return {Session} - Newly created Session object
 */
const createSession = (data)=>{
    return new Session({
        workout: data.workout,
        start: new Date(data.start),
        end: new Date(data.end),
        notes: data.notes,
        exercises: data.exercises
    });
}

/*
 Create modified Session for sending to frontend
 @param {Session} - Session object
 @return {Object} - Modified session object
 */
const responseSession = (session)=>{
    return {
        workout: session.workout,
        start: session.start,
        end: session.end,
        notes: session.notes,
        exercises: session.exercises
    };
}

export {
    createRoute
}
