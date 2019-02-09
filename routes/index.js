var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/pompes', function(req, res, next) {
  res.render('pompes', {page:'pompes', menuId:'pompes.html'});
});

router.get('/releves', function(req, res, next) {
  res.render('releves', {page:'releves', menuId:'releves.html'});
});

module.exports = router;
