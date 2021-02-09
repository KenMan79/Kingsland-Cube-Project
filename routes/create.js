var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');

/* GET Add Cube page. */
router.get('/', function(req, res, next) {
  console.log('add a cube')
  res.render('create', { title: 'Cube Page' });
});

router.post('/', function(req, res, next) {
  console.log("create post ");
  console.log(req.body);

    const cube = new Cube({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    difficultyLevel: req.body.difficultyLevel,
    });
    
    cube.save()
    .then((response) => {
      res.redirect('/')
      })
      .catch((err) => {
        res.send(err)
      })

});

router.get('/accessory', function(req, res, next) {
  console.log('Create accessory');
  res.render('createAccessory', { title: 'Add Accessory'})
});

router.post('/accessory', function(req, res, next) {
  console.log("the accessory form is ", req.body)
  const newAcc = new Accessory({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  });
  newAcc.save()
    .then((res) => { console.log('the new accessory is ', res)})
})
module.exports = router;
