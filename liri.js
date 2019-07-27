require('dotenv').config();
let fs = require('fs');
let moment = require('moment');
let keys = require('./keys.js');
let Spotify = require('node-spotify-api');
let axios = require('axios');
let spotify = new Spotify(keys.spotify);

//  Variables holding command line arguments.
let command = process.argv[2];
let queryParam = process.argv.slice(3).join(' ');

let apiData = [];
let textFileCommand = [];

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

//  Function to append data to a text file.
function dataLog(apiData) {

    fs.appendFile("log.txt", apiData, function(err) {
        if (err) throw err;
        console.log(apiData);
    })
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
        let songArr = data.tracks.items;

        //  Looping through each result and displaying appropriate data in the console.
        for (let i = 0; i < songArr.length; i++) {

            let spotifyPreview = songArr[i].preview_url
            if (spotifyPreview === null) {
                spotifyPreview = 'Not available.';
            }
            apiData = [
                '-------------------------------------------------------------------------------------------------------',
                'Command used for results: {' + command + ' ' + queryParam + '}',
                '-------------------------------------------------------------------------------------------------------',
                'Artist:        ' + songArr[i].artists.map(artistName),
                'Track:         ' + songArr[i].name,
                'Album:         ' + songArr[i].album.name,
                'Preview:       ' + spotifyPreview,
                '-------------------------------------------------------------------------------------------------------\n'
            ].join('\n');

            dataLog(apiData);
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

            for (let i = 0; i < response.data.length; i++) {

                apiData = [
                    '-------------------------------------------------------------------------------------------------------',
                    'Command used for results: {' + command + ' ' + queryParam + '}',
                    '-------------------------------------------------------------------------------------------------------',
                    'Artist(s):  ' + response.data[0].lineup,
                    'Venue:      ' + response.data[i].venue.name,
                    'Location:   ' + response.data[i].venue.city + ', ' + response.data[i].venue.country,
                    'Date:       ' + moment(response.data[i].datetime).format('L'),
                    '-------------------------------------------------------------------------------------------------------\n'
                ].join('\n');

                dataLog(apiData);
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

            apiData = [
                '-------------------------------------------------------------------------------------------------------',
                'Command used for results: {' + command + ' ' + queryParam + '}',
                '-------------------------------------------------------------------------------------------------------',
                // * Title of the movie.
                'Title:              ' + response.data.Title,
                // * Year the movie came out.
                'Year:               ' + response.data.Year,
                // * IMDB Rating of the movie.
                'IMDb:               ' + response.data.imdbRating + '/10',
                // * Rotten Tomatoes Rating of the movie.
                'Rotten Tomatoes:    ' + response.data.Ratings[1].Value,
                // * Country where the movie was produced.
                'Country:            ' + response.data.Country,
                // * Language of the movie.
                'Language:           ' + response.data.Language,
                // * Plot of the movie.
                'Plot:               ' + response.data.Plot,
                // * Actors in the movie.
                'Actors:             ' + response.data.Actors,
                '-------------------------------------------------------------------------------------------------------\n'
            ].join('\n');

            dataLog(apiData);
        }
    );
}


function readText(textFileCommand) {

    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) throw err;

        // Break the string down by comma separation and store the contents into the textFileCommand array.
        textFileCommand = data.split(",");

        if (textFileCommand.length == 2) {
            console.log(textFileCommand);
            userInput(textFileCommand[0], textFileCommand[1]);
        } else if (textFileCommand.length == 1) {
            userInput(textFileCommand[0]);
        }
    });
}