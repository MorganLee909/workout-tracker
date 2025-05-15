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
                name: "notes",
                type: "String (optional)",
                desc: "Notes from the user about the session"
            },
            {
                name: "exercises",
                type: "[Object]",
                desc: "List of flexible objects. Structure of each object based on the type of exercise"
            }
        ]
    }
]
