var express = require('express');
var router = express.Router();
const Accessory = require('../models/accessory');
const Cube = require('../models/cube');


/* GET users listing. */
router.get('/:id', function(req, res, next) {
  Cube.findOne({
    _id: req.params.id
  })
  .then((response) => {
    res.render('updatedDetailsPage', {title: 'Cube Details', cube: response})
  })
  .catch((err) => {
    console.log(err);
  })
});

module.exports = router;


