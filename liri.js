require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
// var OMDB = require("omdbapi");
// var bandsInTown = require("bandsintown");
moment = require("moment");
var keys = require("./key.js");
var spotify = new Spotify(keys.spotify);
var bandKey = keys.bandsintown.key;
// console.log(spotify.credentials);
// console.log(bandKey);

var userCommand = process.argv[2];
var userSearch = process.argv.slice(3).join(" ");
console.log(userSearch);

switch (userCommand) {
  case "concert-this":
    concert();
    break;
  case "spotify-this-song":
    spotifyIt();
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
      var date = moment().calendar(response.data[0].datetime);
      console.log(date);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function spotifyIt() {
  if (userSearch === undefined) {
    userSearch = "The Sign";
  }

  // Code taken from spotify api documentation example: https://www.npmjs.com/package/node-spotify-api
  spotify.search({ type: "track", query: userSearch }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    // console.log(data.tracks.items[0]);
    var originalArtists = [];
    for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
      if (
        originalArtists.indexOf(data.tracks.items[0].artists[i].name) === -1
      ) {
        originalArtists.push(data.tracks.items[0].artists[i].name);
      }
    }
    var artists = [];
    var artistsList = data.tracks.items;
    for (var i = 0; i < artistsList.length; i++) {
      var artistsSub = artistsList[i].artists;
      for (var j = 0; j < artistsSub.length; j++) {
        if (
          artists.indexOf(artistsSub[j].name) == -1 &&
          originalArtists.indexOf(artistsSub[j].name) == -1
        ) {
          artists.push(artistsSub[j].name);
        }
      }
    }
    var previewLink = artistsList[0].preview_url;
    var album = artistsList[0].album.name;
    artists = artists.join(", ");
    console.log("Original artists: " + originalArtists.join(", "));
    console.log("\nCover Artists: " + artists);
    console.log("\nPreview link: " + previewLink);
    console.log("\nAlbum: " + album);

    // End code from https://www.npmjs.com/package/node-spotify-api
  });
}
