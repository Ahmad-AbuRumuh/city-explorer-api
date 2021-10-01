const axios = require('axios');
let cacheMemory = {};
// http://localhost:3001/movies?city=Amman

function getmoviesHandler(req, res) {
    let moviesname = req.query.city
    
    // request url
    let request = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${moviesname}`

    if (cacheMemory[moviesname] !== undefined) {
        res.send(cacheMemory[moviesname]);
    }else {
    try {
    axios.get(request).then(movieResults => {
        let  newArray = movieResults.data.results.map(element => {

            return new AllMovie(element)
    })
        res.send(newArray)
    })
      }catch (error) {
        res.send(error);
        }
    }  
}
class AllMovie{
    constructor(element){
        this.title = element.title;
        this.overview= element.overview;
        this.average_votes= element.vote_average;
        this.total_votes = element.vote_count;
        this.image_url = 'https://image.tmdb.org/t/p/w500' + element.poster_path;
        this.popularity = element.popularity;
        this.released_on = element.release_date;
        
    }
}
module.exports = getmoviesHandler;