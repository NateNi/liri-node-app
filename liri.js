require("dotenv").config();
var Spotify = require('node-spotify-api');

var keys = require('./keys');
//var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var name = process.argv.splice(3).join(' ');

if (command === "concert-this") {
    console.log("Concert This was entered");
    console.log("Name: " + name);
}
else if (command === "spotify-this-song") {
    if (name === "") {
        name = "The Sign";
    }
    var spotify = new Spotify(keys.spotify);
    spotify.search({type: 'track', query: name, limit: 1}, function(err, data) {
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
    console.log("Movie This was entered");
    if (name === "") {
        name = "Mr. Nobody";
    }
    console.log("Name: " + name);
}
else if (command === "do-what-it-says"){
    console.log("Do What it says was entered");
} else {
    console.log("Command not recognized");
}