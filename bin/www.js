#!/usr/bin/env node
var app = require('../app');

// Take the argument 
var argument = process.argv[2];
var nothelp = 'use argument help';
//some setttings
var pjson = require('../package.json');

// 1. package.json
var port = pjson.port;

// 2. environment
if (process.env.PORT) {
    port = process.env.PORT;
}

// 3. command line option 
if (argument === 'port' || argument === 'p' || argument === '-p') {
 port = process.argv[3];
}

console.log('current port is ' + port);

// Help arguments
if (argument === 'help' || argument === 'h' || argument === '-h') {
    //fetch help variables file
    require('./lib/help');
  } 
  
if (argument === false) {
    console.log(nothelp);
 }

// version arguments
if (argument === 'version' || argument === 'v' || argument === '-v') {
    //fetch help variables file
    console.log('You are using ' + pjson.name + ' version of ' + pjson.version);
  } 

app(port);
