import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';

// --- Model and vehicle methods for routes.

import { getAllModels, insertNewModel, getAllModelsAndQuantity, getAllVehicles, insertNewVehicle } from './controllers/vehicleController.js';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT;


// --- Connecting to MongoDB and starting server if DB connection is successfull.

mongoose.connect(process.env.MONGODB_URI, {useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log(`Successfully connected to MONGO DB`.cyan);
        app.listen(PORT, () => {
            console.log(`Server started on PORT: ${PORT}`.blue);
        });
    })
    .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('API is running...'));

// -- Returns all models ARRAY.
app.get('/models', getAllModels);

// -- Inserts new model into DB, and returns object containg data whether insertion is successfull or not.
app.post('/models', insertNewModel);

// -- Returns all models ARRAY plus quantity of certain model vehicles in each Model object.
app.get('/modelscount', getAllModelsAndQuantity);

// -- Returns all vehicles ARRAY. In each vehicle object modelID is modified to model name and hour price joined string. 
app.get('/vehicles', getAllVehicles);

// -- Inserts new vehicle into DB and returns object containing data whether insertion is successfull or no.
app.post('/vehicles', insertNewVehicle);

// -- Returns all vehicles of certain country ARRAY. In each vehicle object modelID is modified to model name and hour price joined string. 
app.get('/vehicles/:location', getAllVehicles);