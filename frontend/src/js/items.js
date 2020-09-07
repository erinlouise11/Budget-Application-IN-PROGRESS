// -- Global Variables --
// storing the document elements in variables
const navHome = document.getElementById("nav-home-button");
const navItems = document.getElementById("nav-items-button");
const navPlans = document.getElementById("nav-plans-button");
const navEvents = document.getElementById("nav-events-button");
const itemElement = document.getElementById("item-name");
const dateElement = document.getElementById("pay-date");
const selectElement = document.getElementById("item-select");
const amountElementAdd = document.getElementById("add-amount-input");
const amountElementEdit = document.getElementById("edit-amount-input");
const checkbox = document.querySelector('input[name=theme]');
let table = document.querySelector("table");

// constructor
function init() {

    activePage();
    getItemData();
}

// getting the data from the JSON file 
function getItemData() {

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', "../js/json/items.json") //download is GET, send is POST followeed by URL 
    ourRequest.onload = function () {

        var ourData = JSON.parse(ourRequest.responseText); //so that it can read it as JSON and not an array
        renderHTML(ourData);
    }

    ourRequest.send();
}

// organizing the data and sending it to be populated into the table 
function renderHTML(data) {

    let incomeData = data[0];
    let itemData = data[1];
    let balanceData = data[2];

    generateTable(incomeData, itemData, balanceData);

    // for(i=0;i<data.length; i++){
    //     for(j=0; j < data[i].length; j++){
    //         console.log(data[i][j].till15);
    //     }
    // }

    // for(i=0; i < incomeData.length;i++){
    //     console.log(incomeData[i].till15);
    // }   

    // var htmlString;
    // var lov15 = 0, lovn = 0;

    // for(i=0;i<data.length-1;i++){
    //     for(j=0;j<data[i].length;j++){
    //         htmlString = data[i][j].name;
    //         console.log(htmlString);

    //         lov15 += data[i][j].till15;       
    //         lovn += data[i][j].tillnext15;
    //     }
    // }

    // console.log(lov15);
    // console.log(lovn);
}

// checking for the active page to add nav button higlight
let activePage = () => {

    if (document.title === "Items") {

        navHome.style.backgroundColor = "var(--panel)";
        navItems.style.backgroundColor = "var(--shadow)";
        navPlans.style.backgroundColor = "var(--panel)";
        navEvents.style.backgroundColor = "var(--panel)";
    }
}

// event listener for dark mode toggle
checkbox.addEventListener('change', function () {

    if (this.checked) {
        lightMode = false;
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        lightMode = true;
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
    }
});

// transition function for dark mode toggle
let trans = () => {

    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 100);
}

// populating the table with the data
function generateTable(income, item, balance) {

    for (let element of income) {

        let row = document.querySelector("tbody").insertRow();
        for (key in element) {

            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }

    for (let element of item) {

        let row = document.querySelector("tbody").insertRow();
        for (key in element) {

            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }

    for (let element of balance) {

        let row = document.querySelector("tfoot").insertRow();
        for (key in element) {

            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

// adding the item to an object
function addItem() {

    // item and date validation
    if (itemElement.value === "") {
        document.getElementById("item-required").style.display = "inline";
    } else {
        document.getElementById("item-required").style.display = "none";
    }

    if (dateElement.value === "") {
        document.getElementById("date-required").style.display = "inline";
    } else {
        document.getElementById("date-required").style.display = "none";
    }

    // validation for amount
    if (amountElementAdd.value == "") {
        document.getElementById("amount-required").style.display = "inline";
    } else {
        document.getElementById("amount-required").style.display = "none";
    }

    // alowing the user to enter multiple inputs before sending the data to the file
    if (!itemElement.value == "" && !amountElementAdd.value == "") {
        document.getElementById("close").style.display = "none";
        document.getElementById("done").style.display = "inline";

        itemElement.value = " ";
        amountElementAdd.value = " ";
    }

    // if (document.getElementById("pay-date").value < 15) {

    // } 

    // copy the file into an array, then take the input, check what type it is and add it to the array
    // save the array to the file (overwrite).

    // for editing, change on screen, capture into an array then send array to php/JSON file 

}

function changeItems() {

    // validation for credit cards selection 
    if (selectElement.selectedIndex == 0) {
        document.getElementById("item-required").style.display = "inline";
    } else {
        document.getElementById("item-required").style.display = "none";
    }

    // validation for amount
    if (amountElementEdit.value == "") {
        document.getElementById("amount-required").style.display = "inline";
    } else {
        document.getElementById("amount-required").style.display = "none";
    }

    // alowing the user to enter multiple inputs before sending the data to the file
    if (!selectElement.selectedIndex == 0 && !amountElementEdit.value == "") {
        document.getElementById("close").style.display = "none";
        document.getElementById("done").style.display = "inline";

        selectElement.selectedIndex = 0;
        amountElementEdit.value = " ";
    }
}

function deleteItem() {

    //search for the item in the array and then remove it
}

function sendItem() {

    //send the array to the json file and overrite the previous data 
    closeForm();
}

// opening the Add Item form
function openAddForm() {

    document.getElementById("add-item-form").style.display = "block";
    document.getElementById("item-table").style.display = "none";
    document.getElementById("item-buttons").style.display = "none";
    // document.getElementById("done").style.display = "none";
    // document.getElementById("item-required").style.display = "none";
    // document.getElementById("date-required").style.display = "none";
    // document.getElementById("amount-required").style.display = "none";
}

// opening the Edit Item form 
function openEditForm() {

    document.getElementById("edit-items-form").style.display = "block";    
    document.getElementById("item-table").style.display = "none";
    document.getElementById("item-buttons").style.display = "none";    
    // document.getElementById("done").style.display = "none";
    // document.getElementById("item-required").style.display = "none";
    // document.getElementById("amount-required").style.display = "none";

    selectElement.selectedIndex = 0;
}

// closing the open form 
function closeForm() {

    document.getElementById("item-table").style.display = "block";
    document.getElementById("item-buttons").style.display = "inline";
    document.getElementById("add-item-form").style.display = "none";
    document.getElementById("edit-items-form").style.display = "none";
}

// calling the constructor
init();