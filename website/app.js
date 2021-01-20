/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = '&appid=' + 'f3d7f9329bfa0710852e607843dbba7e';

let d = new Date();
let newDate = d.getDate() + '.' +( d.getMonth()+1) + '.' +  d.getFullYear();

/* fetch input from text boxes */
document.getElementById('generate').addEventListener('click', performAction);

function performAction(event) {
    // requesting a city instead of the zip code as the zip codes didn't work for Europe
    const newCity = document.getElementById('city').value;
    const newFeeling = document.getElementById('feelings').value;
    getWeather(baseURL, newCity, apiKey)
        .then(function (data) {
            // console.log(data);
            postData('/add', {
                date: newDate,
                city: newCity,
                temp: data,
                feelings: newFeeling
            })
            updateUI()
        })
}

const getWeather = async (url = '', city = '', key = '') => {
    const res = await fetch(url + city + '&units=metric' + key)
    //call weather API
    try {
        const data = await res.json();
        // console.log(data);
        return data.main.temp
    } catch (error) {
        console.log("error", error);
    }
    // console.log(city);
}

// Async POST
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// update UI with the new content
const updateUI = async () => {
    const req = await fetch('/all')
    try {
        const allData = await req.json()
        const last = allData.length-1;
        console.log(allData);
        document.getElementById('date').innerHTML = "Today's date: " + allData[last].date;
        document.getElementById('myCity').innerHTML = "City: " + allData[last].city;
        document.getElementById('temp').innerHTML = "Temp: " + allData[last].temp + '°C';
        document.getElementById('content').innerHTML = "Feelings: " + allData[last].feelings;
    } catch (error) {
        console.log('error', error)
    }
}
