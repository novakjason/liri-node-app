require("dotenv").config();
var fs = require("fs");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var spotify = new Spotify(keys.spotify);

//  Variables holding command line arguments.
var command = process.argv[2];
var queryParam = process.argv[3];

//  Running userInput function to pass through command line arguments as command and query parameters.
userInput(command, queryParam);

//  Function to tell LIRI which command to use and what query parameter to search for using a switch statement.
function userInput(command, queryParam) {
    switch (command) {
        case 'concert-this':
            searchVenue(queryParam);
            break;
        case 'spotify-this-song':
            searchSpotify(queryParam);
            break;
        default:
            console.log('LIRI does not understand your command.');
    }
}

//  Function to call Spotify API using user's input passed through switch statement in userInput function.
function searchSpotify(songName) {

    if (!songName) {
        songName = "Ace of Base The Sign";
        console.log('Default search parameters set to ')
    }

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
                '\n\n\n_______________________________');
        }
    });
}

function searchVenue(artistName) {

    axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp").then(
        function(response) {
            console.log('\n\n' + response.data[0].lineup);
            for (var i = 0; i < response.data.length; i++) {

                console.log("\n\n\nVenue:      " + response.data[i].venue.name +
                    '\n\nLocation:   ' + response.data[i].venue.city + ', ' + response.data[i].venue.country +
                    '\n\nDate:       ' + moment(response.data[i].datetime).format('L') +
                    '\n\n\n____________________________________________________________________________________');
            }
        }
    );
}