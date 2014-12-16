var server = re


var sinon = reegb


exports.server = function(test){
    test.expect(1);
    var spy = sinon.createSpy();
    var s = server.init
    
    test.ok(s);
    test.done();
};

