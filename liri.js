require('dotenv').config();
var fs = require('fs');
var moment = require('moment');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var axios = require('axios');
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
        case 'movie-this':
            searchMovie(queryParam);
            break;
        case 'do-what-it-says':
            readText();
            break;
        default:
            console.log('LIRI does not understand your command.');
    }
}

//  Function to call Spotify API using user's input passed through switch statement in userInput function.
function searchSpotify(songName) {

    if (!songName) {
        songName = 'Ace of Base The Sign';
        console.log('Default search parameters set to: ' + songName);
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
            console.log('\n\n\nArtist:        ' + songArr[i].artists.map(artistName) +
                '\n\nTrack:         ' + songArr[i].name +
                '\n\nAlbum:         ' + songArr[i].album.name +
                '\n\nPreview:       ' + spotifyPreview +
                '\n\n\n____________________________________________________________________________________');
        }
    });
}

function searchVenue(artistName) {

    if (!artistName) {
        artistName = 'Red Hot Chili Peppers';
        console.log('Default search parameters set to: ' + artistName);
    }

    axios.get('https://rest.bandsintown.com/artists/' + artistName + '/events?app_id=codingbootcamp').then(
        function(response) {
            console.log('\n\n' + response.data[0].lineup);
            for (var i = 0; i < response.data.length; i++) {

                console.log('\n\n\nVenue:      ' + response.data[i].venue.name +
                    '\n\nLocation:   ' + response.data[i].venue.city + ', ' + response.data[i].venue.country +
                    '\n\nDate:       ' + moment(response.data[i].datetime).format('L') +
                    '\n\n\n____________________________________________________________________________________');
            }
        }
    );
}

function searchMovie(movieName) {

    if (!movieName) {
        movieName = 'Mr. Nobody';
        console.log('Default search parameters set to: ' + movieName);
    }

    axios.get('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy').then(
        function(response) {

            // * Title of the movie.
            console.log('\n\n\nTitle:              ' + response.data.Title);
            // * Year the movie came out.
            console.log('\nYear:               ' + response.data.Year);
            // * IMDB Rating of the movie.
            console.log('\nIMDb:               ' + response.data.imdbRating + '/10');
            // * Rotten Tomatoes Rating of the movie.
            console.log('\nRotten Tomatoes:    ' + response.data.Ratings[1].Value);
            // * Country where the movie was produced.
            console.log('\nCountry:            ' + response.data.Country);
            // * Language of the movie.
            console.log('\nLanguage:           ' + response.data.Language);
            // * Plot of the movie.
            console.log('\nPlot:               ' + response.data.Plot);
            // * Actors in the movie.
            console.log('\nActors:             ' + response.data.Actors + '\n\n');
        }
    );
}


function readText() {

    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) throw err;

        // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");

        if (output.length == 2) {
            userInput(output[0], output[1]);
        } else if (output.length == 1) {
            userInput(output[0]);
        }
    });
}