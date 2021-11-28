import mongoose from 'mongoose';

const modelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    hourPrice: {
        type: Number,
        required: true,
    }
});

export const Model = mongoose.model('Model', modelSchema);