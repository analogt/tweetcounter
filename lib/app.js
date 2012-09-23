/*
    app.js - main io-loop
*/
var twitter = require('ntwitter');
var credentials = require('./credentials.js');
var parser = require('./parse.js')

//Create streaming object.
var t = new twitter({
    consumer_key: credentials.twitter.consumer_key,
    consumer_secret: credentials.twitter.consumer_secret,
    access_token_key: credentials.twitter.access_token_key,
    access_token_secret: credentials.twitter.access_token_secret
});

//Object to store word count frequency. 
var freq = {}

//Start the Twitter stream.
t.stream(
    'statuses/filter',
    { track: ['Philadelphia'] },
    function(stream) {
        stream.on('data', function(data) {
            freq = parser.word_frequency(data.text);
            parser.to_redis(data.text)
        });
    }
);
//Periodic Callback to out word counts
setInterval(function(){
    console.log(JSON.stringify(parser.out_format(freq))+'\n')
},10000);

//Export for testing
module.exports = t