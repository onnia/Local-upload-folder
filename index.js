/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = require('./app/app.js');
var pjson = require('./package.json');
var run = pjson.scripts.start;


// Take the argument 
var argument = process.argv[2];

if (argument === 'help' || argument === 'h') {
    //fetch help variables file
    require('./app/lib/help.js');
  } if (argument === false) {
    console.log(nothelp);
 }
 
console.log('');





