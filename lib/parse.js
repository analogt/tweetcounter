/*
	parse.js - consumes tweets and parses them
*/

function Parser() {
    this.freq = {
    	word_count:{},
    	time_stamp:''
    };
}


// Takes the incoming twitter stream, parses it, and returns word frequency.
Parser.prototype.word_frequency = function(tweet){
	var tweet = tweet.split(' ')
	for (var i in tweet){
			tweet[i] = cleanTweet(tweet[i])
			if(tweet[i].length >1){
	      		this.freq.word_count[tweet[i]] ? this.freq.word_count[tweet[i]]+=1 : this.freq.word_count[tweet[i]]=1;
			}
		}
	this.freq.time_stamp = new Date().toUTCString()
	return this.freq;
}
Parser.prototype.to_redis = function(tweet){
	var redis = require('redis'),
		client = redis.createClient();
	var tweet = tweet.split(' ')
	for (var i in tweet){
		tweet[i] = cleanTweet(tweet[i])
		if(tweet[i].length>1){
			client.incr(tweet[i])
		}
	}
	client.close
}
// Removes words that appear only once for cleaner more relevant output.
Parser.prototype.out_format = function(freq){
	var fmt_freq = {
		word_count:{},
		time_stamp:new Date().toUTCString()
	}
	for (var word in freq.word_count){
		if (freq.word_count[word]>1){
			fmt_freq.word_count[word] = freq.word_count[word]
		}
	};
	fmt_freq.time_stamp = new Date().toUTCString()
	return fmt_freq
}
/* TODO
Parser.prototype.to_log = function(tweet){

	return {}
}
*/
module.exports = new Parser;

var cleanTweet = function(tweet){
	return tweet.replace(/[^a-zA-Z0-9\s]/,'')
};
