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
                name: "workouts",
                type: [Object],
                desc: "List of workouts. Includes name of the workout and list of exercises"
            },
            {
                name: "workouts.name",
                type: "String",
                desc: "Name of the workout"
            },
            {
                name: "workouts.exercises",
                type: "[String]",
                desc: "List of strings, each one being the name of an exercise"
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
    }
]
