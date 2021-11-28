const displayError = (errorMsg, parentElem, beforeElem) => {
    const alertElementID = 'error-row';
    let alertElement;
    if(document.getElementById(alertElementID)) {
        alertElement = document.getElementById(alertElementID);
        alertElement.innerHTML = '';
    } else {
        alertElement = document.createElement('div');
        alertElement.id = alertElementID;
        alertElement.classList.add('row');

        parentElem.insertBefore(alertElement, beforeElem);
    }
    alertElement.innerHTML = /*html*/
    `
    <div class="col-12">
        <div class="alert alert-danger d-flex align-items-center" role="alert">
            <i class="fas fa-times-circle"></i> 
            <span class="mx-2">${errorMsg}</span>
        </div>
    </div>
    `;
}
const displayWarning = (warningMsg, parentElem, beforeElem) => {
    const alertElementID = 'warning-row';
    let alertElement;
    if(document.getElementById(alertElementID)) {
        alertElement = document.getElementById(alertElementID);
        alertElement.innerHTML = '';
    } else {
        alertElement = document.createElement('div');
        alertElement.id = alertElementID;
        alertElement.classList.add('row');

        parentElem.insertBefore(alertElement, beforeElem);
    }
    alertElement.innerHTML = /*html*/
    `
    <div class="col-12">
        <div class="alert alert-warning d-flex align-items-center" role="alert">
            <i class="fas fa-exclamation-triangle"></i> 
            <span class="mx-2">${warningMsg}</span>
        </div>
    </div>
    `;
}
const displaySuccess = (successMsg, parentElem, beforeElem) => {
    const alertElementID = 'success-row';
    let alertElement;
    if(document.getElementById(alertElementID)) {
        alertElement = document.getElementById(alertElementID);
        alertElement.innerHTML = '';
    } else {
        alertElement = document.createElement('div');
        alertElement.id = alertElementID;
        alertElement.classList.add('row');

        parentElem.insertBefore(alertElement, beforeElem);
    }
    alertElement.innerHTML = /*html*/
    `
    <div class="col-12">
        <div class="alert alert-success d-flex align-items-center" role="alert">
            <i class="fas fa-thumbs-up"></i> 
            <span class="mx-2">${successMsg}</span>
        </div>
    </div>
    `;
}

export {displayError, displayWarning, displaySuccess};