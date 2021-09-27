'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();

const dataWeather = require('./data/weather.json');

const PORT = process.env.PORT;
server.use(cors());

class Forcast {
    constructor(date, description){
        this.date = date;
        this.description = description;
    }
}

// http://localhost:3001/weather?nameOfCity=Amman
server.get('/weather', (req, res) => {
    try{
        let weatherOfCity = req.query.nameOfCity;

        let cityInfo = dataWeather.find((item)=>{
            if(item.city_name === weatherOfCity) {
                return item;
            }
        });
        let newArray = cityInfo.data.map(element => {
            return new Forcast(element.datetime, element.weather.description);    
        });
        res.send(newArray);
    }
    catch (err) {
        res.send("Something went wrong.");
    }
});

// localhost:3005/ANYTHING
server.get('*',(req, res) => {
    res.status(404).send('route is not found')
});

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
});
