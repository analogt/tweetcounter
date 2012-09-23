all: install test run

install: 
	npm install

test:
	./node_modules/.bin/mocha \
		--reporter list -t 10000

run:
	node ./lib/app.js > twitter.log

 .PHONY: test install run