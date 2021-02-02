// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();



// get route for all data
app.get('/all', (req, res) => {
    response.send(projectData);
    console.log(projectData);
});

// post route
app.post('/addData', (req, res) => {
    let data = request.body;
    projectData['temp'] = data.temp;
    projectData['feel'] = data.feel;
    projectData['date'] = data.date;
    response.send(projectData);
});

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;

const server = app.listen(port, ()=> {
    console.log(`Running on localhost: ${port}`)
});

