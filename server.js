'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();

const dataWeather = require('./data/weather.json');

const PORT = process.env.PORT;
server.use(cors());


const getmoviesHandler = require('./module/movie.js')
const getweatherHandler = require('./module/weatherAPI.js')
// Routes
server.get('/weather', getweatherHandler);
server.get('/movies', getmoviesHandler);

// localhost:3005/ANYTHING
server.get('*',(req, res) => {
    res.status(404).send('route is not found')
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
});
