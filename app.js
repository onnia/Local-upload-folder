var server = require('./lib/server');
 
module.exports = function (port) {
    var app = server.initialise();
    server.start(port);
    
};


