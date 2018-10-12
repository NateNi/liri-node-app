require("dotenv").config();
var Spotify = require('node-spotify-api');
let fs = require("fs-extra");
let moment = require('moment')

var keys = require('./keys');
var request = require('request');

var command = process.argv[2];
var name = process.argv.splice(3).join(' ');



if (command === "do-what-it-says") {
    fs.readFile('random.txt', function read(err, data) {
        let content = data.toString().split(",");
        runCommand(content[0],content[1]);
    })
} else {
    runCommand(command,name);
}


function runCommand(command, name) {




    if (command === "concert-this") {
        request("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp", function (error, response, body) {
            var parseBody = JSON.parse(body);
            for (let i = 0; i < parseBody.length; i++) {
                console.log(parseBody[i].venue.name);
                console.log(parseBody[i].venue.city + ", " + parseBody[i].venue.country);
                let date = parseBody[i].datetime;
                console.log(moment(date).format("MM/DD/YYYY"));
                console.log("---------------");
            }
        });
    }
    else if (command === "spotify-this-song") {
        if (name === "") {
            name = "The Sign Ace of Base";
        }
        var spotify = new Spotify(keys.spotify);
        spotify.search({ type: 'track', query: name, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('An error has occurred: ' + err);
            }
            console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        });
    }
    else if (command === "movie-this") {
        if (name === "") {
            name = "Mr. Nobody";
        }
        request("http://www.omdbapi.com/?apikey=trilogy&t=" + name, function (error, response, body) {
            var parseBody = JSON.parse(body);
            console.log("Title: " + parseBody.Title);
            console.log("Released: " + parseBody.Released.slice(-4));
            console.log("IMDB Rating: " + parseBody.imdbRating);
            let ratings = parseBody.Ratings;
            let rtRating = null;
            for (let i = 0; i < ratings.length; i++){
                if(ratings[i].Source === 'Rotten Tomatoes') {
                    rtRating = ratings[i].Value;
                }
            }
            console.log("Rotten Tomatoes Rating: " + rtRating);
            console.log("Countries: " + parseBody.Country);
            console.log("Languages: " + parseBody.Language);
            console.log("Plot: " + parseBody.Plot);
            console.log("Actors: " + parseBody.Actors);
            console.log("---------------------------");
            console.log(parseBody);
        })
    }
    else {
        console.log("Command not recognized");
    }
}