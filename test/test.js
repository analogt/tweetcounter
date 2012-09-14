/*
	It is recommended to run tests with a timeout in mocha of 10000ms or more to account for lag.
*/

var ntwitter = require('ntwitter')
	, assert = require('should')
	, app = require('../lib/app.js')
	, parser = require('../lib/parse.js');


var stream = app.stream('statuses/sample')


//Testing the stream that we're using in this application.
describe('Twitter Stream', function(){
	describe('Filtered', function(){
		it('should return an object with text property', function(done){
			app.stream(
			    'statuses/filter',
    			{ track: ['Philadelphia'] },
			    function(stream) {
			        stream.on('data', function(data) {
			            data.should.be.a('object').and.have.property('text');
			            done()
			        });
			    }
			);
		});
	})
});

//Parser Tests
describe('Parser', function(){
	describe('out_format function',function(){
		it('should return an object with word_count and time_stamp property', function(done){
			parser.out_format({}).should.be.a('object')
			parser.out_format({}).should.have.property('word_count')
			parser.out_format({}).should.have.property('time_stamp')
			done();
		});
	})
	describe('word frequency function', function(){
		it('should return an object with word_count and time_stamp property', function(done){
			parser.word_frequency('Test Tweet').should.be.a('object')
			parser.word_frequency('Test Tweet').should.have.property('word_count')
			parser.word_frequency('Test Tweet').should.have.property('time_stamp')
			done();
		});
	})
	
});


