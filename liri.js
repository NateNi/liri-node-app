require("dotenv").config();
var Spotify = require('node-spotify-api');

var keys = require('./keys');
var request = require('request');

var command = process.argv[2];
var name = process.argv.splice(3).join(' ');

if (command === "concert-this") {
    request("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp", function (error, response, body) {
        var parseBody = JSON.parse(body);
        for (let i = 0; i < parseBody.length; i++) {
            console.log(parseBody[i].venue.name);
            console.log(parseBody[i].venue.city + ", " + parseBody[i].venue.country);
            let date = parseBody[i].datetime.substring(0,10);
            console.log(date.substring(5,7) + "-" + date.substring(8,10) + "-" + date.substring(0,4));
            console.log("---------------");
        }
    });
}
else if (command === "spotify-this-song") {
    if (name === "") {
        name = "The Sign";
    }
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: name, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('An error has occurred: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].album.name);
    });
}
else if (command === "movie-this") {
    if (name === "") {
        name = "Mr. Nobody";
    }
    request("http://www.omdbapi.com/?apikey=trilogy&t="+name, function (error, response, body) {
        var parseBody = JSON.parse(body);
        console.log("Title: " + parseBody.Title);
        console.log("Released: " + parseBody.Released.slice(-4));
        console.log("IMDB Rating: " + parseBody.imdbRating);
        console.log("Languages: " + parseBody.Language);
        console.log("Plot: " + parseBody.Plot);
        console.log("Actors: " + parseBody.Actors);
    })
}
else if (command === "do-what-it-says") {
    console.log("Do What it says was entered");
} else {
    console.log("Command not recognized");
}