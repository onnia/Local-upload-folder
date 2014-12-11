
var app = require('../app.js');

/* put some test here*/ 

   /*
    * 
    exports.calculate = function (num) {
    return num * 2;
        };
    
    exports['calculate'] = function (test) {
    test.equal(doubled.calculate(2), 4);
    test.done();
};
    
     */
   
   /*
    exports.calculate = function (num) {
    if (typeof num === 'number') {
         return num * 2;
    }
    else {
        throw new Error('Expected a number');
    }
};
     *
     **/
   
   /*
  ======== A Handy Little Nodeunit Reference ========
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
46f6500ss
 *
 **/

   
   exports['expression'] = {
  'expression function test': function (err, req, res, next){
   test.expect(2);
   
   var respond = res.status();
   
   test.equal(respond, 500,[true]);
   test.notEqual(respond, err.status,[false]);
   return test.done();
  },
  'correctly matches non-palindrome strings': function(test) {
    test.expect(1);
//    test.equal(palindrode.test('This is not a palindrome'), false);
    test.done();
  }
};
    
    
    /*
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    }); 
    };
    */
    
    // test.done();


