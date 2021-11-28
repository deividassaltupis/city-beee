//  --  Imported functions and Constants
import { MODELS_URI } from "./modules/endpoints.js";
import {
  displayError,
  displayWarning,
  displaySuccess,
} from "./modules/alerts.js";

//  --  Model add form submit button
const ADD_MODEL_SUBMIT_BUTTON = document.querySelector(
  "#add-model-submit-button"
);

//  --  DIV Element with boostrap 'row' class which contains column of form elements. If alerts appear they'll be inserted before this element
const ADD_MODEL_FORM_ROW = document.querySelector("#add-model-form-row");

//  --  MAIN HTML element which will be parent to all kinds of allerts.
const MAIN_ELEMENT = document.querySelector("main");

//  --  Function for posting data objects into server. Used for model adding
const postData = async (URI, modelObj) => {
  return await fetch(URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modelObj),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result)
        displaySuccess(data.message, MAIN_ELEMENT, ADD_MODEL_FORM_ROW);
      else displayError(data.message, MAIN_ELEMENT, ADD_MODEL_FORM_ROW);
    })
    .catch((error) => displayError(error, MAIN_ELEMENT, ADD_MODEL_FORM_ROW));
};

//  --  Function which will be called when add model form submit button is clicked. Functions validates inputs and then calls postData function.
const submitAddModelForm = (e) => {
  e.preventDefault();
  const MODEL_NAME_INPUT = document.querySelector("#model-name-input");
  const HOUR_PRICE_INPUT = document.querySelector("#hour-price-input");

  if (MODEL_NAME_INPUT.value == "" || HOUR_PRICE_INPUT.value == "") {
    displayWarning(
      "Please fill all required fields",
      MAIN_ELEMENT,
      ADD_MODEL_FORM_ROW
    );
    return;
  }
  const modelObj = {
    name: MODEL_NAME_INPUT.value,
    hourPrice: HOUR_PRICE_INPUT.value,
  };
  postData(MODELS_URI, modelObj);
};

ADD_MODEL_SUBMIT_BUTTON.addEventListener("click", submitAddModelForm);
