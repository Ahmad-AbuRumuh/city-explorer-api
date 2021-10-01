const axios = require('axios');
let cacheMemory = {};

// http://localhost:3001/weather?city=Amman

function getweatherHandler(req, res) {
    let weathercity = req.query.city;

    let request = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weathercity}&key=${process.env.WEATHER_KEY}`
    if (cacheMemory[weathercity] !== undefined) {
        res.send(cacheMemory[weathercity]);
    }
    else {
        try {
             axios.get(request).then(weatherResults => {
             let newArray = weatherResults.data.data.map(element => {

            return new Forcast(element)
                 });
         cacheMemory[weathercity] = newArray;
            res.send(newArray)

        });
        }
     catch (error) {
    res.send(error);
    }
    }
}

class Forcast {
    constructor(element){
        this.date = element.datetime; 
        this.description =element.weather.description;
    }
}
module.exports = getweatherHandler;