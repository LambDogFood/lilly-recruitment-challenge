//
// Author: Alex Edgar 19 Feb 2025
//

const API_URL = 'http://localhost:8000/'

/*
    Load the medicine table 'medicine-table-body'
    Args:
        medicines (array): List of medicines from the medicine_db
*/
function LoadMedicineTable(medicines) {
    const tableBody = document.getElementById('medicine-table-body');
    tableBody.innerHTML = '';

    medicines.forEach((medicine) => {

        const price = medicine.price ? "£" + medicine.price.toFixed(2) : "[unknown]";
        const name = medicine.name ? medicine.name : "[unknown]";

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${price}</td>
            <td>
                <button onClick="DeleteMedicine('${name}')" class='remove-btn'>X</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

/*
    Sends a DELETE request to the /delete endpoint
    Args
        medicineName (string): Name of the medicine to delete
*/
function DeleteMedicine(medicineName) {
    
    const formData = new FormData();
    formData.append('name', medicineName)

    fetch(API_URL + 'delete', {
        method: 'DELETE',
        body: formData,
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return;
    })
    .then(() => {
        LoadMedicines();
    }).catch((error) => {
        console.log(error);
    });
};

/* 
    Sends a request to the API endpoint to search for a specific medicine, if the search field is empty reload the full medicine list
*/
function SearchMedicine() {

    const errorTag = document.getElementById('medicine-error-tag');
    const name = document.getElementById('medicine-search-bar').value;

    if (name === "") {
        errorTag.style = 'display: none;'
        errorTag.textContent = '';
        LoadMedicines();
        return;
    }

    fetch(API_URL + 'medicines/' + name)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to get medicine data for ${name}: ${response.status}`);
        }
        return response.json();
    })
    .then((result) => {

        if (result.error) {
            throw new Error(result.error);
        }

        LoadMedicineTable([result])
        errorTag.style = 'display: none;'
        errorTag.textContent = '';
    })
    .catch((error) => {
        errorTag.style = 'display: block;'
        errorTag.textContent = error
        console.log(error)
    });
};

/*
    Update medicine form, on submit sends a POST request to the /update endpoint to update the price of a medicine
*/
const updateMedicineForm = document.getElementById('update-medicine-form');
updateMedicineForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const errorTag = document.getElementById('update-error-tag');
    const name = document.getElementById('update-medicine-name').value;
    const price = document.getElementById('update-medicine-price').value;

    const formData = new FormData();
    formData.append('name', name)
    formData.append('price', price)

    fetch(API_URL + 'update', {
        method: 'POST',
        body: formData,
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to update medicine`);
        }
        return;
    })
    .then(() => {
        LoadMedicines();
        updateMedicineForm.reset();
        errorTag.style = 'display: none;';
        errorTag.textContent = "";
    }).catch((error) => {
        errorTag.style = 'display: block;';
        errorTag.textContent = error;
        console.log(error);
    });
});

/*
    Add medicine form, on submit sends a POST request to the /create endpoint to create a new medicine with name and price
*/
const addMedicineForm = document.getElementById('create-medicine-form');
addMedicineForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const errorTag = document.getElementById('create-error-tag');
    const name = document.getElementById('create-medicine-name').value;
    const price = document.getElementById('create-medicine-price').value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);

    fetch(API_URL + 'create', {
        method: 'POST',
        body: formData,
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to create new medicine.");
        }
        return;
    })
    .then(() => {
        LoadMedicines();
        addMedicineForm.reset();
        errorTag.style = 'display: none;';
        errorTag.textContent = "";
    }).catch((error) => {
        errorTag.style = 'display: block;';
        errorTag.textContent = error;
        console.log(error);
    });
});

/*
    Updates the average price element returned from the /average endpoint
*/
function DisplayAveragePrice() {
    const element = document.getElementById('average-price');

    fetch(API_URL + 'average')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        return response.json();
    })
    .then((result) => {
         element.textContent = `£${result.average_price.toFixed(2)}`;
    })
    .catch((error) => {
        element.textContent = "Failed to load average price.";
        console.log(error);
    });
};

/*
    Fetches the medicines from the /medicines endpoint and then uses LoadMedicineTable() and DisplayAveragePrice()
*/
function LoadMedicines() {
    
    const tableBody = document.getElementById('medicine-table-body');
    tableBody.innerHTML = '';

    fetch(API_URL + 'medicines')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        return response.json();
    })
    .then((result) => {
        const medicines =  result.medicines;
        LoadMedicineTable(medicines);
    })
    .catch((error) => {
        console.log(error);
    })

    DisplayAveragePrice();
};

document.addEventListener('DOMContentLoaded', LoadMedicines);