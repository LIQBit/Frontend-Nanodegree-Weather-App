// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();

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


// get route for all data
app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData);
});

// post route
app.post('/addData', (req, res) => {
    console.log(req.body)
    let data = req.body;
    projectData['temperature'] = data.temp;
    projectData['feeling'] = data.feeling;
    projectData['date'] = data.date;
    res.send(projectData);
});

// Setup Server

const port = 8000;

const server = app.listen(port, ()=> {
    console.log(`Running on localhost: ${port}`)
});

