import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    exercises: [{
        name: {
            type: String,
            required: true
        },
        notes: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: true
        },
        archived: {
            type: Boolean,
            required: true,
            default: false
        }
    }]
});

export default mongoose.model("Workout", WorkoutSchema);
