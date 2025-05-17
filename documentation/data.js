window.data = [
    {
        type: "object",
        title: "User",
        id: "user",
        auth: false,
        description: "User object",
        properties: [
            {
                name: "id",
                type: "String",
                desc: "Unique user ID"
            },
            {
                name: "name",
                type: "String",
                desc: "User name"
            },
            {
                name: "email",
                type: "String",
                desc: "User email address"
            }
        ]
    },
    {
        type: "route",
        id: "createUser",
        title: "Create",
        url: "POST /user",
        auth: false,
        description: "Create a new user",
        requestBody: [
            {
                name: "name",
                type: "String",
                desc: "User name"
            },
            {
                name: "email",
                type: "String",
                desc: "User email address"
            },
            {
                name: "pass",
                type: "String",
                desc: "User password"
            },
            {
                name: "confirmPass",
                type: "String",
                desc: "Confirmation password"
            }
        ],
        responseBody: [{
            name: "success",
            type: "true",
            desc: "Always '{success: true} if no error'"
        }]
    },
    {
        type: "route",
        id: "loginUser",
        title: "Log In",
        url: "PUT /user/login",
        auth: false,
        description: "Log the user in",
        requestBody: [
            {
                name: "email",
                type: "String",
                desc: "User email address"
            },
            {
                name: "pass",
                type: "String",
                desc: "User password"
            }
        ],
        responseBody: [{
            name: "N/A",
            type: "User",
            desc: "User object"
        }]
    },
    {
        type: "route",
        id: "logoutUser",
        title: "Log Out",
        url: "GET /user/logout",
        auth: false,
        description: "Log the user out of this device",
        responseBody: [{
            name: "success",
            type: "true",
            desc: "Always {success: true} if no error"
        }]
    },
    {
        type: "object",
        title: "Workout",
        id: "workout",
        auth: false,
        description: "A workout plan that the user creates",
        properties: [
            {
                name: "id",
                type: "String",
                desc: "Unique ID of the workout"
            },
            {
                name: "exercises",
                type: "[Object]",
                desc: "A list of all exercises for this workout. Contains a name and an enum 'type'"
            },
            {
                name: "exercises.id",
                type: "String",
                desc: "Unique ID of the exercise"
            },
            {
                name: "exercises.name",
                type: "String",
                desc: "User given name of the exercise"
            },
            {
                name: "exercises.notes",
                type: "String",
                desc: "User created notes for the exercise"
            },
            {
                name: "exercises.type",
                type: "String",
                desc: "Enum describing what type of exercise it is",
                options: ["weights"]
            }
        ]
    },
    {
        type: "route",
        id: "createWorkout",
        title: "Create",
        url: "POST /workout",
        auth: true,
        description: "Create a new workout for a user",
        requestBody: [
            {
                name: "name",
                type: "String",
                desc: "Name of the workout"
            },
            {
                name: "exercises",
                type: "[Object]",
                desc: "List of all exercises for the workout. Contains a name and an enum 'type'"
            },
            {
                name: "exercises.name",
                type: "String",
                desc: "Name of the exercise"
            },
            {
                name: "exercises.notes",
                type: "String (optional)",
                desc: "User created notes for the exercise"
            },
            {
                name: "exercises.type",
                type: "String",
                desc: "Enum describing what type of exercise it is",
                options: ["weights"]
            }
        ],
        responseBody: [{
            name: "N/A",
            type: "Workout",
            desc: "Workout object"
        }]
    },
    {
        type: "route",
        id: "getWorkouts",
        title: "Get",
        url: "GET /workout",
        auth: true,
        description: "Retrieve all of the workouts for logged in user",
        responseBody: [{
            name: "N/A",
            type: "[Workout]",
            desc: "List of workouts for the logged in user"
        }]
    },
    {
        type: "route",
        id: "updateWorkoutNote",
        title: "Update Note",
        url: "PUT /workout/:workoutId/note",
        auth: true,
        description: "Create a note for a specific exercise",
        requestBody: [
            {
                name: "exercise",
                type: "String",
                desc: "ID of the exercise to update the note for"
            },
            {
                name: "note",
                type: "String",
                desc: "User created note for exercise"
            }
        ],
        responseBody: [{
            name: "N/A",
            type: "Workout",
            desc: "Workout object"
        }]
    },
    {
        type: "route",
        id: "updateWorkout",
        title: "Update",
        url: "PUT /workout/:workoutId",
        auth: true,
        description: "Update a workout. Specifically the exercises in the workout",
        requestBody: [{
            name: "existingExercises",
            type: "[Object]",
            desc: "List of exercises in order. Existing exercises should be {id: <ExerciseId>} and new exercises should be {new: <ExerciseName>}"
        }],
        responseBody: [{
            name: "N/A",
            type: "Workout",
            desc: "Workout object"
        }]
    },
    {
        type: "object",
        title: "Session",
        id: "session",
        auth: false,
        description: "An instance of a workout",
        properties: [
            {
                name: "id",
                type: "String",
                desc: "Unique ID of the session"
            },
            {
                name: "start",
                type: "Date",
                desc: "Date/Time when session started"
            },
            {
                name: "end",
                type: "Date",
                desc: "Date/Time when session finished"
            },
            {
                name: "exercises",
                type: "[Object]",
                desc: "List of flexible objects. Structure of each object based on the type of exercise"
            }
        ]
    },
    {
        type: "route",
        id: "createSession",
        title: "Create",
        url: "POST /session",
        auth: true,
        description: "Create a new workout session",
        requestBody: [
            {
                name: "workout",
                type: "String",
                desc: "ID of the workout this is part of"
            },
            {
                name: "start",
                type: "Date",
                desc: "Date/Time of session start"
            },
            {
                name: "end",
                type: "Date",
                desc: "Date/Time of session end"
            },
            {
                name: "exercises",
                type: "[Object]",
                desc: "List of flexible objects. Structure of each object based on the type of exercise"
            }
        ],
        responeBody: [{
            name: "N/A",
            type: "Session",
            desc: "Session object"
        }]
    },
    {
        type: "route",
        id: "getSessions",
        title: "Get",
        url: "GET /session/:workoutId",
        auth: true,
        description: "Retrieve the previous 5 sessions recorded for a specific workout",
        responseBody: [{
            name: "N/A",
            type: "[Session]",
            desc: "List of Session objects"
        }]
    }
]
