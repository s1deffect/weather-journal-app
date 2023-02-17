// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, ()=> console.log(`server is running at port: ${port}`)
);



//post route to recieve data from the client side
app.post('/add', (req, res) => {
    projectData = {
        temperature : req.body.temp,
        date : req.body.date,
        userResponse: req.body.feelings,
    };
});

//get route to send data to client side to update ui
app.get('/all', (req, res) => {
    res.send(projectData);
});