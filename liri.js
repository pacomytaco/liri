require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require("node-spotify-api");


var request = require('request');
// var fs = require('file-system');
var fs = require("fs");

var keys = require('./keys.js');
var twitterkeys = new twitter(keys.twitter);
var spotify = new spotify(keys.spotify);

var nodeArg = process.argv;
var liriCmnd = process.arch[2];

var liriArg = '';
for (var i = 3; i<nodeArg.length; i++) {
    liriArg += nodeArg[i] + ' ';
}

switch(liriCmnd) {
    case "my-tweets":
    getTweets();
    break;

    case "spotify-this-song":
    if(liriArg){
        spotifySong(liriArg);
    } else{
        spotifySong("The Sign")
    }
    break;

    case "movie-this":
    if(liriArg){
        movieOmdb(liriArg)
    } else {
        movieOmdb("Mr. Nobody")
    }
    break;





}//switchcmnd

function getTweets() {
    twitterkeys.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i=0; i<tweets.statuses.length; i++) {
                var tweets = tweets.statuses[i].text;
                console.log("tweet: " + tweets);
                var tweetDate = tweets.statuses[i].created_at;
                console.log("date tweeted: " + tweetDate);

                fs.appendFile('log.txt', "@pacomytaco2: " + tweets + "date tweeted: " + tweetDate.substring(0, 14));
                fs.appendFile('log.txt', "----------------");
            }
        }else {
            console.log(error);
        }
    });
}//function gettweets

function spotifySong(song){
    Spotify({ type: 'track', query: song}, function (error, data) {
        if(!error) {
            for(var i = 0; i < data.tracks.itmes[i]; i++) {
            console.log("Artist: " + songData.artists[0].name);
            console.log("Song Title: " + songData.name);
            console.log("preview URL: " + songData.preview_url);
            console.log("Album Title: " + songData.album.name);
            console.log("----------------");

            fs.appendFile('log.txt', songData.artists[0].name);
            fs.appendFile('log.txt', songData.name);
            fs.appendFile('log.txt', songData.preview_url);
            fs.appendFile('log.txt', songData.album.name);
            fs.appendFile('log.txt', "-----------------");
        }
    } else {
        console.log('error');
    }
    });
}

//key http://www.omdbapi.com/?i=tt3896198&apikey=12e4f227
function movieOmdb(movies){
    var queryUrl = "http://www.omdbapi.com/?t=" + movies + "&y=&plot=short&tomatoes=true&r=json";

    request(queryUrl, function(error, response, body) {
        if(!error && response.statuseCode === 200) {
            var movTitle = JSON.parse(body);
        
        console.log("Movie Title: " + movie.Title);
        console.log("Release Year: " + movie.Year);
        console.log("IMDB Rating: " + movie.imdbRating);
        console.log("Rotten Tomatoes Rating: " + movie.Ratings[2].Value);
        console.log("Produced in (country): " + movie.Country);
        console.log("Language: " + movie.Language);
        console.log("Plot: " + movie.Plot);
        console.log("Actors: " + movie.Actors);


        fs.appendFile('log.txt' + movie.Title);
        fs.appendFile('log.txt' + movie.Year);
        fs.appendFile('log.txt' + movie.imdbRating);
        fs.appendFile('log.txt' + movie.Ratings[2].Value);
        fs.appendFile('log.txt' + movie.Country);
        fs.appendFile('log.txt' + movie.Language);
        fs.appendFile('log.txt' + movie.Plot);
        fs.appendFile('log.txt' + movie.Actors);
        }
       
    });
}

function doSomething() {
    fs.readFile('random.txt', "utf8", function(error, data) {
        if(error) {
            console.log(error);
        }
            var dataSplit = data.split(",");
    }) if (dataArr[0])
}