/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var pjson = require('../package.json');
//Help text
var help = 'To get the app up and going run type "npm start"';
var nothelp = 'Dont you know how to write? Just type "help", please!';
console.log(''); 
console.log(pjson.name + ' current version of ' + pjson.version );
console.log('');  
console.log(pjson.name + ' - ' + pjson.description);
console.log('');  
console.log('application is created by '+ pjson.author.name);
console.log('');  
console.log(help);  
console.log('');  
console.log('Check out for readme file for more info'); 
console.log('');
console.log('Most common problem right now is with the usage of the port. I you get some error message i recomend you to change the port from the package.json file');
console.log('The most important command is "grunt" ');
console.log('Othe commands are "grunt test", "grunt files", "grunt server" and "grunt remove" ');