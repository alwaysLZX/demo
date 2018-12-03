var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  res.render('index', { title: '这是post效果' });
});

router.put('/', function(req, res, next) {
  res.render('index', { title: '这是put效果' });
});

router.delete('/', function(req, res, next) {
  res.render('index', { title: '这是delete效果' });
});


module.exports = router;
