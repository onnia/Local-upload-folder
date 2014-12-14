var express = require('express');
var router = express.Router();
 // express name to use imported form package.json file
var pjson = require('../package.json');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: pjson.name });
});

module.exports = router;
