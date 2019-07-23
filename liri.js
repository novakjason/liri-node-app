require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//  Variables holding command line arguments.
var command = process.argv[2];
var queryParam = process.argv[3];

//  Running userInput function to pass through command line arguments as command and query parameters.
userInput(command, queryParam);

//  Function to tell LIRI which command to use and what query parameter to search for using a switch statement.
function userInput(command, queryParam) {
    switch (command) {
        case 'spotify-this-song':
            searchSpotify(queryParam);
            break;
        default:
            console.log('LIRI does not understand your command.');
    }
}

//  Function to call Spotify API using user's input passed through switch statement in userInput function.
function searchSpotify(songName) {
    //  Using callback function 
    spotify.search({ type: 'track', query: songName, limit: 10 }, function callback(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //  Function to grab artists name needed to traverse artists map object.
        function artistName(artist) {
            return artist.name;
        }

        //  Variable holding each result array object.
        var songArr = data.tracks.items;

        //  Looping through each result and displaying appropriate data in the console.
        for (var i = 0; i < songArr.length; i++) {

            var spotifyPreview = songArr[i].preview_url
            if (spotifyPreview === null) {
                spotifyPreview = 'Not available.';
            }
            console.log('\n\n\nArtist: ' + songArr[i].artists.map(artistName) +
                '\n\nTrack: ' + songArr[i].name +
                '\n\nAlbum: ' + songArr[i].album.name +
                '\n\nSpotify Preview: ' + spotifyPreview +
                '\n\n\n_______________________________'
            );
        }
    });
}