import mongoose from 'mongoose';

const vehicleSchema = mongoose.Schema({
    modelID: {
        type: String,
        required: true,
    },
    numberPlate: {
        type: String,
        required: true,
    },
    countryLocation: {
        type: String,
        required: true,
    }
}, {timestamps: true});

export const Vehicle = mongoose.model('Vehicle', vehicleSchema);