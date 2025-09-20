import mongoose from "mongoose";
const { Schema } = mongoose;

const interactionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workId: {
        type: String,
        required: true
    },
    interactionType: {
        type: String,
        enum: ['Liked', 'Disliked', 'Searched', 'Created'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
})

const Interaction = mongoose.model('Interaction', interactionSchema)
export default Interaction