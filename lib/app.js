/*
    app.js - main io-loop
*/
var twitter = require('ntwitter');
var credentials = require('./credentials.js');
var parser = require('./parse.js')
var express = require('express');
var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);



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
            io.sockets.emit('tweet',freq)
        });
    }
);

server.listen(4000);

app.get('/', function(req,res){
    res.sendfile(__dirname+'/index.html');
})
app.use('/js',express.static(__dirname+'/js'));
app.use('/styles',express.static(__dirname+'/styles'));


//Periodic Callback to out word counts
setInterval(function(){
    console.log(JSON.stringify(parser.out_format(freq))+'\n')
},10000);

//Export for testing
module.exports = t