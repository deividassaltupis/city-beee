import { Model } from '../models/vehicleModel.js';
import { Vehicle } from '../models/vehicle.js';
import getFinancialData from './financialDataController.js';

//   --   Sends model list from DB
const getAllModels = async (req, res) => res.send(await Model.find());

//   --   Function for new model insertion.
const insertNewModel = async (req, res) => {
    if(!req.body.name || !req.body.hourPrice) {
        res.send({result: false, message: 'Please enter these data about model: name, hour price and VAT.'});
        return;
    }
    const modelName = req.body.name;
    const hourPrice = +req.body.hourPrice;
    const newModel = new Model({name: modelName, hourPrice: hourPrice});

    const savedModel = await newModel.save();

    // -- Front end can check insertion result by getting result value from sent back object.
    if(savedModel)
        res.send({result: true, message: 'New model successfully added.', model: savedModel});
    else
        res.send({result: false, message: 'Failed to add model. Fault occurred in server.'});
}

//   --   Send model list from DB plus adding to each single model object quantity of this kind of model vehicles.
const getAllModelsAndQuantity = async (req, res) => {
    let modelArr = await Model.find();
    let vehicleArr = await Vehicle.find();
    let formatedModelArr = [];

    modelArr.forEach(vModel => {
        let formatedModel = { ...vModel._doc };

        formatedModel.quantity = vehicleArr.reduce((count, currentVeh) => {
            if(currentVeh.modelID == vModel._id)
                count ++;
            return count;
        }, 0);

        formatedModelArr.push(formatedModel);
    });
    res.send(formatedModelArr);
}

//   --   Function for vehicle data formatting. In vehicle array each vehicle object's modelID is replaced by model data, plus price is calculated with VAT inc.
//   --   Returns vehicle array ready to be returned when requested.
const formatVehicleData = (vehicleArray, modelArray, VAT) => {
    return vehicleArray.reduce((newArr, currentVeh) => {
        const vehModel = modelArray.find(vModel => vModel._id == currentVeh.modelID);

        let vehicle = { ... currentVeh._doc };
        let priceIncVAT = vehModel.hourPrice * (1 + (VAT / 100));

        vehicle.modelID = [vehModel.name, priceIncVAT].join();

        newArr.push(vehicle);
        return newArr;
    }, []);
}

const getAllVehicles = async (req, res) => {
    let vehicleArr = [];
    if(req.params.location) {
        const location = String(req.params.location).toUpperCase();
        vehicleArr = await Vehicle.find({countryLocation: location});
    } else
        vehicleArr = await Vehicle.find();

    const modelArr = await Model.find();

    const fData = await getFinancialData();
    const VAT = parseInt(fData.VAT_Tax_Percentage_LT);

    const formatedData = formatVehicleData(vehicleArr, modelArr, VAT);

    res.send(formatedData);
};

const insertNewVehicle = async (req, res) => {
    if(!req.body.modelID || !req.body.numberPlate || !req.body.countryLocation) {
        res.send({result: false, message: 'Please enter these data about vehicle: model ID, location country and number plate.'});
        return;
    }

    const vehModelID = req.body.modelID;

    const vModel = await Model.findById(vehModelID);
    if(!vModel) {
        res.send({result: false, message: 'Failed to add vehicle. Model with such ID does not exist.'});
        return;
    }

    const numberPlate = req.body.numberPlate;
    const countryLocation = req.body.countryLocation;

    const newVehicle = new Vehicle({ modelID: vehModelID, numberPlate: numberPlate, countryLocation: countryLocation });

    const savedVehicle = await newVehicle.save();
    if(savedVehicle)
        res.send({result: true, message: 'New vehicle successfully added.', vehicle: savedVehicle});
    else
        res.send({result: false, message: 'Failed to add vehicle. Fault occurred in server.'});
}

export {getAllModels, insertNewModel, getAllModelsAndQuantity, getAllVehicles, insertNewVehicle};