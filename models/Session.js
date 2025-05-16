import mongoose from "mongoose";

const SessionSchema = mongoose.Schema({
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    exercises: [{}]
});

export default mongoose.model("session", SessionSchema);
