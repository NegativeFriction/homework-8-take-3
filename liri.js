require("dotenv").config();
fs = require("fs");
var Spotify = require("node-spotify-api");
var axios = require("axios");
moment = require("moment");
var keys = require("./key.js");
var spotify = new Spotify(keys.spotify);
var bandKey = keys.bandsintown.key;
var omdbKey = keys.omdb.key;

var userCommand = process.argv[2];
if (process.argv[3] != undefined) {
  var userSearch = process.argv.slice(3).join(" ");
}

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
    userSearch = "The Sign (ace of base)";
  }

  // Code taken from spotify api documentation example: https://www.npmjs.com/package/node-spotify-api
  spotify.search({ type: "track", query: userSearch }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    // End code from https://www.npmjs.com/package/node-spotify-api

    if (data.tracks.items.length > 0) {
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
      console.log("\nTitle: " + artistsList[0].name);
      console.log("\nPreview link: " + previewLink);
      console.log("\nAlbum: " + album);
    } else {
      console.log(
        "Sorry, I don't recognize that song. Please try again, and make sure you've spelled it correctly!"
      );
    }
  });
}

function movie() {
  if (userSearch === undefined) {
    userSearch = "Mr. Nobody";
  }
  var queryURL =
    "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + userSearch;
  axios.get(queryURL).then(function(response) {
    response = response.data;

    var title = response.Title;
    var released = response.Year;
    var IMDBrating = response.Ratings[0].Value;
    var rtRating = response.Ratings[1].Value;
    var produced = response.Country;
    var lang = response.Language;
    var plot = response.Plot;
    var actors = response.Actors;
    console.log(
      "\nTitle: " +
        title +
        "\nReleased in " +
        released +
        "\nIMDB: " +
        IMDBrating +
        "\nRotten Tomatoes: " +
        rtRating +
        "\nProduced in: " +
        produced +
        "\nLanguage: " +
        lang +
        "\nPlot Summary: " +
        plot +
        "\nCast: " +
        actors
    );
  });
}

function doWhatItSays() {
  var text = fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");
    console.log(dataArr);
    userSearch = dataArr[1].split("");
    userSearch.pop();
    userSearch.shift();
    userSearch = userSearch.join("");
    switch (dataArr[0]) {
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
        console.log(
          "Oh no you don't. We don't do infinite loops up in hurr, ya joik!"
        );
        break;
    }
  });
}
