import { MODELS_URI, MODELS_COUNT_URI } from "./modules/endpoints.js";
import { displayError } from "./modules/alerts.js";

//  --  Models list table body for row inserting
const MODELS_TBODY_ELEM = document.querySelector('#models-table-body');

//  --  Models and vehicle count list table body for row inserting
const MODELS_AND_COUNT_TBODY_ELEM = document.querySelector('#modelscount-table-body');

//  --  DIV Element with boostrap 'row' class which contains columns of table elements. If alerts appear they'll be inserted before this element
const TABLE_LIST_ROW_ELEM = document.querySelector('#table-list-row');

//  --  MAIN HTML element which will be parent to all kinds of allerts.
const MAIN_ELEMENT = document.querySelector('main');

//  --  Data fetching function.
const fetchData = async (URI) => {
    return await fetch(URI)
        .then(data => data.json())
        .catch(error => displayError(error, MAIN_ELEMENT, TABLE_LIST_ROW_ELEM));
}

//  --  Models display function. Inserts model rows into tableBody
const displayModels = (modelsList, tableBody) => {
    tableBody.innerHTML = '';
    if(modelsList)
        modelsList.forEach((model, index) => {
            tableBody.innerHTML += 
            `
            <tr>
                <th scope="row">#${index} &nbsp&nbsp${model._id}</th>
                <td>${model.name}</td>
                <td>${Number(model.hourPrice).toFixed(2)} &euro;</td>
            </tr>
            `;
        });
};

//  --  Models display function. Inserts model and vehicle count rows into tableBody
const displayModelsAndCount = (modelsCountList, tableBody) => {
    tableBody.innerHTML = '';
    if(modelsCountList)
        modelsCountList.forEach((model, index) => {
            tableBody.innerHTML += 
            `
            <tr>
                <th scope="row">#${index} &nbsp&nbsp${model._id}</th>
                <td>${model.name}</td>
                <td>${Number(model.hourPrice).toFixed(2)} &euro;</td>
                <td>${model.quantity}</td>
            </tr>
            `;
        });
};

//  --  Fetch and display model lists when Document content is loaded. Display errors if something goes wrong
window.addEventListener('DOMContentLoaded', () => {
    (async ()=> {
        try {
            const modelList = await fetchData(MODELS_URI);
            const modelCountList = await fetchData(MODELS_COUNT_URI);

            displayModels(modelList, MODELS_TBODY_ELEM);
            displayModelsAndCount(modelCountList, MODELS_AND_COUNT_TBODY_ELEM);
        } catch (err) {
            displayError(err, MAIN_ELEMENT, TABLE_LIST_ROW_ELEM);
            console.log(err);
        }
    })();
});