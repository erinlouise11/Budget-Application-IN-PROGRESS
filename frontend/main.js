// ------ Global Variables ------
let bBInterestRate = 0.0, citiInterestRate = 0.1099, chaseInterestRate = 0.2140;
let dash15JSON, dashNext15JSON, chaseJSON, citiJSON, bestbuyJSON;
let balanceItem;
let sendToJSONArray = new Array();

// storing the document elements in variables 
const navHome = document.getElementById("nav-home-button");
const navItems = document.getElementById("nav-items-button");
const navPlans = document.getElementById("nav-plans-button");
const navEvents = document.getElementById("nav-events-button");
const amountT15 = document.getElementById("amount-till-15");
const amountNext15 = document.getElementById("amount-next-15");
const balChaseElement = document.getElementById("chase-amount");
const balCitiElement = document.getElementById("citi-amount");
const bbElement = document.getElementById("bestbuy-amount");
const selectElement = document.getElementById("card-select");
const amountElement = document.getElementById("amount-input");
const checkbox = document.querySelector('input[name=theme]'); // dark mode switch

// constructor
function init() {

    activePage();
    getCreditData();
    getDashboardData();
    //updateDashboard(); 
    //updateCreditBalances();
}

// checking for the active page to add nav button higlight
let activePage = () => {
    if (document.title === "Dashboard") {

        navHome.style.backgroundColor = "var(--shadow)";
        navItems.style.backgroundColor = "var(--panel)";
        navPlans.style.backgroundColor = "var(--panel)";
        navEvents.style.backgroundColor = "var(--panel)";
    }
}

// getting data from the JSON file for the dashboard items
function getDashboardData() {

    const request = new XMLHttpRequest();
    request.open('GET', "src/js/json/items.json") //download is GET, send is POST followeed by URL 
    request.onload = function () {

        const parseData = JSON.parse(request.responseText); //so that it can read it as JSON and not an array
        renderDashboardHTML(parseData);
    }

    request.send();
}

// organizing the data and assigning it 
function renderDashboardHTML(data) {

    let dashboardData = data[2];

    dash15JSON = dashboardData[0].till15;
    dashNext15JSON = dashboardData[0].tillnext15;

    updateDashboard();
}

// getting data from the JSON file for the credit card balances 
function getCreditData() {

    const request = new XMLHttpRequest();
    request.open('GET', "src/js/json/credit.json") //download is GET, send is POST followeed by URL 
    request.onload = function () {

        const parseData = JSON.parse(request.responseText); //so that it can read it as JSON and not an array
        renderCreditHTML(parseData);
    }

    request.send();
}

// organizing the data and assigning it 
function renderCreditHTML(data) {

    for (i = 0; i < data.length; i++) {

        if (data[i].card === "Chase Credit Card") {
            chaseJSON = data[i].balance;
        } else if (data[i].card === "Citi Credit Card") {
            citiJSON = data[i].balance;
        } else {
            bestbuyJSON = data[i].balance;
        }
    }

    updateCreditBalances();
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

function updateDashboard() {

    amountT15.innerHTML = "$ " + dash15JSON;
    amountNext15.innerHTML = "$ " + dashNext15JSON;

    amountT15.style.textAlign = "right";
    amountT15.style.paddingRight = "1em";

    amountNext15.style.textAlign = "right";
    amountNext15.style.paddingRight = "1em";
}

// updating the credit card balances shown
function updateCreditBalances() {

    balChaseElement.innerHTML = " $ " + chaseJSON;
    balCitiElement.innerHTML = "$ " + citiJSON;
    bbElement.innerHTML = "$ " + bestbuyJSON;
}

class Balance {
    constructor(name, amount) {
        this.name = name;
        this.balance = amount;
    }
}

function createSaveArray() {

    // adding the original data to an array 
    balanceItem = new Balance("Chase Credit Card", chaseJSON);
    sendToJSONArray.push(balanceItem);

    balanceItem = new Balance("Citi Credit Card", citiJSON);
    sendToJSONArray.push(balanceItem);

    balanceItem = new Balance("Best Buy Credit Card", bestbuyJSON);
    sendToJSONArray.push(balanceItem);
}

function inputCreditAmounts() {

    // validation for credit cards selection 
    if (selectElement.selectedIndex == 0) {
        document.getElementById("card-required").style.display = "inline";
    } else {
        document.getElementById("card-required").style.display = "none";
    }

    // validation for amount
    if (amountElement.value == "") {
        document.getElementById("amount-required").style.display = "inline";
    } else {
        document.getElementById("amount-required").style.display = "none";
    }

    // alowing the user to enter multiple inputs before sending the data to the file
    if (!selectElement.selectedIndex == 0 && !amountElement.value == "") {
        document.getElementById("close").style.display = "none";
        document.getElementById("done").style.display = "inline";

        // saving the input values in vriables
        let bankName = selectElement.options[selectElement.selectedIndex].text;
        let balanceAmount = amountElement.value;

        if (bankName === "Chase Credit Card") {
            chaseJSON = balanceAmount;
        } else if (bankName === "Citi Credit Card") {
            citiJSON = balanceAmount;
        } else {
            bestbuyJSON = balanceAmount;
        }

        // updating the balance of an existing item in the sendToJSONArray
        for (i = 0; i < sendToJSONArray.length; i++) {
            if (sendToJSONArray[i].name === bankName) {
                sendToJSONArray[i].balance = balanceAmount;
            }
        }

        console.log(bankName, balanceAmount);
        console.log(sendToJSONArray);

        // clearing the form 
        selectElement.selectedIndex = 0;
        amountElement.value = " ";
    }    
}

function saveCreditData() {

    updateCreditBalances();

    // sending the data to the JSON file
    const request = new XMLHttpRequest();
    let balanceJSON = JSON.stringify(sendToJSONArray);
    let URL = "src/php/saveCredit.php?data=" + encodeURI(balanceJSON);
    request.open("GET", URL);
    request.setRequestHeader("Content-Type", "text/plain");
    request.send();

    // close the form and update the balances with the new data
    closeForm();
    //getCreditData();
}

// when the update button is pressed and the user needs to update the balances
function openForm() {

    document.getElementById("balance-update-form").style.display = "inline";
    document.getElementById("update-balance-button").style.display = "none";
    document.getElementById("done").style.display = "none";
    document.getElementById("card-required").style.display = "none";
    document.getElementById("amount-required").style.display = "none";

    // adding the data to the array so that the values can be updated
    // done outside of the renderData() because it gets called again when saved
    // this causes it to duplicate the items in the array
    createSaveArray();

    selectElement.selectedIndex = 0;
}

// pressing the close button when the form is open (cancels action)
function closeForm() {

    document.getElementById("balance-update-form").style.display = "none";
    document.getElementById("update-balance-button").style.display = "block";
}

// calling the constructor
init();

// --- FUNCTIONS TO ADD TO PAYMENT PLANS AND EVENTS ---
// if (document.title === "Payment Plans"){

//     navHome.style.backgroundColor = "none";
//     navItems.style.backgroundColor = "none";
//     navPlans.style.backgroundColor = "var(--shadow)";
//     navEvents.style.backgroundColor = "none";      
// }

// if(document.title === "Events"){
//     navHome.style.backgroundColor = "none";
//         navItems.style.backgroundColor = "none";
//         navPlans.style.backgroundColor = "none";
//         navEvents.style.backgroundColor = "var(--shadow)";      
// }