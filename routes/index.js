
 // express name to use imported form package.json file
var pjson = require('../package.json');


var userRoutes = {
  '/': {
    method: 'get',
    fn: function(req, res) {
         res.render('index', { title: pjson.name });
        }
  }
};


module.exports = userRoutes;
