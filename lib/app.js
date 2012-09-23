/*
    app.js - main io-loop
*/
var twitter = require('ntwitter');
var credentials = require('./credentials.js');
var parser = require('./parse.js')
var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs')


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
            io.sockets.emit('tweet',freq)
        });
    }
);

app.listen(4000);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
    function(err, data){
        if(err){
            res.writeHead(500);
            return res.end('Error loading index.html')
        }
        res.writeHead(200);
        res.end(data);
    });
}


//Periodic Callback to out word counts
setInterval(function(){
    console.log(JSON.stringify(parser.out_format(freq))+'\n')
},10000);

//Export for testing
module.exports = t