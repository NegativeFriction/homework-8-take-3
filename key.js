console.log("This is loaded");

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.bandsintown = {
  key: process.env.bandsInTownKey
};
