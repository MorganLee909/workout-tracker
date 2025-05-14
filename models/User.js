import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    workouts: [{
        name: {
            type: String,
            required: true
        },
        exercises: {
            type: [String],
            required: false
        }
    }],
    uuid: {
        type: String,
        required: true
    }
});

export default mongoose.model("user", UserSchema);
