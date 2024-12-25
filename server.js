// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8000;
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// Callback to debug

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
    res.send(projectData); // Send the stored data back to the client
    console.log('GET Request received:', projectData); 
});
// Post Route
app.post('/add', (req, res) => {
    const { temperature, date, userResponse } = req.body;
    projectData = {
        temperature: temperature,
        date: date,
        userResponse: userResponse,
    };
    res.send({ message: 'Data saved successfully' }); 
    console.log('POST Request received:', projectData); 
});