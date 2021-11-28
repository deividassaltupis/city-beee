//  --  Imported functions and Constants
import { VEHICLES_URI } from "./modules/endpoints.js";
import {
  displayError,
  displayWarning,
  displaySuccess,
} from "./modules/alerts.js";

//  --  Vehicle add form submit button
const ADD_VEHICLE_SUBMIT_BUTTON = document.querySelector(
  "#add-vehicle-submit-button"
);

//  --  DIV Element with boostrap 'row' class which contains column of form elements. If alerts appear they'll be inserted before this element
const ADD_VEHICLE_FORM_ROW = document.querySelector("#add-vehicle-form-row");

//  --  MAIN HTML element which will be parent to all kinds of allerts.
const MAIN_ELEMENT = document.querySelector("main");

//  --  Function for posting data objects into server. Used for vehicle adding
const postData = async (URI, vehicleObj) => {
  return await fetch(URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicleObj),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result)
        displaySuccess(data.message, MAIN_ELEMENT, ADD_VEHICLE_FORM_ROW);
      else displayError(data.message, MAIN_ELEMENT, ADD_VEHICLE_FORM_ROW);
    })
    .catch((error) => displayError(error, MAIN_ELEMENT, ADD_VEHICLE_FORM_ROW));
};

//  --  Function which will be called when add vehicle form submit button is clicked. Functions validates inputs and then calls postData function.
const submitAddVehicleForm = (e) => {
  e.preventDefault();
  const MODEL_INPUT = document.querySelector("#model-input");
  const NUMBER_PLATE_INPUT = document.querySelector("#number-plate-input");
  const COUNTRY_LOCATION_INPUT = document.querySelector(
    "#country-location-input"
  );

  if (
    MODEL_INPUT.value == "" ||
    NUMBER_PLATE_INPUT.value == "" ||
    COUNTRY_LOCATION_INPUT.value == ""
  ) {
    displayWarning(
      "Please fill all required fields",
      MAIN_ELEMENT,
      ADD_VEHICLE_FORM_ROW
    );
    return;
  }
  const vehicle = {
    modelID: MODEL_INPUT.value,
    numberPlate: NUMBER_PLATE_INPUT.value,
    countryLocation: COUNTRY_LOCATION_INPUT.value,
  };
  postData(VEHICLES_URI, vehicle);
};

ADD_VEHICLE_SUBMIT_BUTTON.addEventListener("click", submitAddVehicleForm);
