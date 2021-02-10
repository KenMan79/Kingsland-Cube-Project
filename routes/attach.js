var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');

/* GET home page. */
router.get('/:id', function(req, res, next) {
  Cube.findOne({_id: req.params.id}).populate('accessories')  
  .then((thisCube) => {
      console.log('Cube to attach accessory to ', thisCube)
    let idArr = thisCube.accessories.map(accessory => {return accessory._id})
    console.log('Cube test idArr', idArr)
    Accessory.find()
    .then((foundAccessories) => {
        console.log('Found Accessories to attach accessory to ', foundAccessories)
      const dropDownAccessory = foundAccessories.filter(accessory => !idArr.includes(accessory._id))
      res.render('attachAccessory', { title: 'Attach Accessory', cube: thisCube, dropDownAccessory: dropDownAccessory });
    })
    .catch((error) => {
      console.log('LOOK AT THIS', error);
    })
  })
  .catch((error) => {
    console.log('LOOK AT THIS', error);
  })
});

router.post('/:id', function(req, res, next) { 
  const selectAccessoryId = req.params.accessory
  const cubeId = req.params.id
  console.log('The attach form is ', req.body, req.params.id)
  Cube.findOneAndUpdate(
    {_id: req.params.id}, 
    {$push: {'accessories': selectAccessoryId}}, 
    {upsert: true },
    function (err) {
      if (err) {console.log(err);
      }
    }
  )
  Accessory.findOneAndUpdate(
    {_id : selectAccessoryId}, 
    {$push: {'cubes': cubeId}}, 
    {upsert: true },
    function (err) {
      if (err) {console.log(err);
      }
    }
  )
  res.redirect(`/details/${cubeId}`);
});


module.exports = router;
