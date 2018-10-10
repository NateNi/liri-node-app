require("dotenv").config();

var keys = require('keys');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

if (command === "concert-this") {
    console.log("Concert This was entered");
}
else if (command === "spotify-this-song") {
    console.log("Spotify was entered");
}
else if (command === "movie-this") {
    console.log("Movie This was entered");
}
else if (command === "do-what-it-says"){
    console.log("Do What it says was entered");
} else {
    console.log("Command not recognized");
}