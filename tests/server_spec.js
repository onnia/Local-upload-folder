var server = require('../lib/server');
var sinon = require('sinon');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serveIndex = require('serve-index');
var debug = require('debug')('app');
var routes = require('../routes/index');
var router = express.Router();

/* ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit
 
 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.server = function(test){
    test.expect(1);
    var spy = sinon.spy();
    var proxy = server.start(spy);
    var s = server.initialise;
    
    PubSub.subscribe("message", spy );
    
    proxy();
    
    assert(spy.called);
    
    test.ok(s);
    test.done();
};

