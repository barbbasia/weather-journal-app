// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder called "website"
app.use(express.static('website'));

// Setup Server
const port = 3000;

const server = app.listen(port, listening);

function listening() {
    console.log("server is running");
    console.log(`running on localhost: ${port}`);
}


// respond with object named projectData when a GET req is made to the homepage
// GET route
app.get('/all',getData)

function getData(req,res){
    res.send(projectData)
    // console.log(projectData)
}

// POST route
app.post('/add', addWeather);

// push new entry to the projectData array
function addWeather (req,res){
    // projectData.push(req.body);
    newEntry = {
        date: req.body.date,
        city: req.body.city,
        temp: req.body.temp,
        feelings: req.body.feelings,
    }
    projectData.push(newEntry);
    res.send(projectData);
    console.log(projectData);
    console.log('added new entry');
    return projectData
}
