import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    exercises: [{
        name: {
            type: String,
            required: true
        },
        //enum: weights
        type: {
            type: String,
            required: true
        }
    }]
});

export default mongoose.model("Workout", WorkoutSchema);
