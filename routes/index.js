var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET home page. */
router.get('/', function(req, res, next) {
  Cube.find()
    .then((respond) => {
      res.render('index', { title: 'Cubicle', cube: respond })
    })
    .catch ((err) => {
      console.log(err)
    })
  
});


module.exports = router;
