import { VEHICLES_URI } from "./modules/endpoints.js";
import { displayError } from "./modules/alerts.js";

//  --  Vehicles table body element. Vehicle rows will be inserted inside this element.
const VEHICLES_TBODY_ELEM = document.querySelector('#vehicles-table-body');

//  --  DIV Element with boostrap 'row' class which contains column of table elements. If alerts appear they'll be inserted before this element
const TABLE_LIST_ROW_ELEM = document.querySelector('#table-list-row');

//  --  MAIN HTML element which will be parent to all kinds of allerts.
const MAIN_ELEMENT = document.querySelector('main');

//  --  Select element. After selecting. Table body rows will be refreshed displaying vehicles displaced only in selected country
const COUNTRY_SELECT_ELEM = document.querySelector('#country-select');

//  --  Data fetch function.
const fetchData = async (URI) => {
    return await fetch(URI)
        .then(data => data.json())
        .catch(error => displayError(error, MAIN_ELEMENT, TABLE_LIST_ROW_ELEM));
}

//  --  Displays vehicleList rows inside tableBody element
const displayVehicles = (vehicleList, tableBody) => {
    tableBody.innerHTML = '';
    if(vehicleList)
        vehicleList.forEach((veh, index) => {
            tableBody.innerHTML += 
            `
            <tr>
                <th scope="row">#${index} &nbsp&nbsp${veh._id}</th>
                <td>${veh.modelID}</td>
                <td>${veh.numberPlate}</td>
                <td>${veh.countryLocation}</td>
            </tr>
            `;
        });
};

//  --  On COUNTRY_SELECT_ELEM selected option change this function will be called resulting in table data refreshing.
const onCountrySelect = async (e) => {
    try {
        e.preventDefault();
        const selectedCountry = COUNTRY_SELECT_ELEM.value;
        if(selectedCountry.length !== 2 && COUNTRY_SELECT_ELEM.selectedIndex != '0') 
            throw new Error('Selected country value faulty');

        const vehicleList = await fetchData(VEHICLES_URI + selectedCountry);
        displayVehicles(vehicleList, VEHICLES_TBODY_ELEM);
    } catch (err) {
        displayError(err, MAIN_ELEMENT, TABLE_LIST_ROW_ELEM);
        console.log(err);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    (async ()=> {
        try {
            const vehicleList = await fetchData(VEHICLES_URI);
            displayVehicles(vehicleList, VEHICLES_TBODY_ELEM);
        } catch (err) {
            displayError(err, MAIN_ELEMENT, TABLE_LIST_ROW_ELEM);
            console.log(err);
        }
    })();
});

COUNTRY_SELECT_ELEM.addEventListener('change', onCountrySelect);