require("dotenv").config();
Spotify = require("node-spotify-api");
axios = require("axios");
OMDB = require("omdbapi");
bandsInTown = require("bandsintown");
Moment = require("moment");
var keys = require("./key.js");
var spotify = new Spotify(keys.spotify);
var bandKey = keys.bandsintown.key;
// console.log(spotify.credentials);
// console.log(bandKey);

var userCommand = process.argv[2];
var userSearch = process.argv[3];
var i = 4;
while (process.argv[i] != undefined) {
  userSearch += " " + process.argv[i];
}

switch (userCommand) {
  case "concert-this":
    concert();
    break;
  case "spotify-this-song":
    spotify();
    break;
  case "movie-this":
    movie();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
}

function concert() {
  if (userSearch === undefined) {
    userSearch = "Streetlight Manifesto";
  }

  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    userSearch +
    "/events?app_id=" +
    bandKey;
  axios
    .get(queryURL)
    .then(function(response) {
      console.log(response.data[0].venue.name);
      var venueName = response.data[0].venue.name;
      var venueLocation =
        response.data[0].venue.city +
        ", " +
        response.data[0].venue.region +
        " " +
        response.data[0].venue.country;
      console.log(venueLocation);
      var date = response.data[0].datetime;
      console.log(date);
    })
    .catch(function(error) {
      console.log(error);
      var err = 72
      // Litterally just adding stuff to hopefully force a new add .
    });
}
