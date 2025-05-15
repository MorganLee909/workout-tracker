import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    exercises: [String]
});

export default mongoose.model("Workout", WorkoutSchema);
