const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Accessory = require('./accessory');


const cubeSchema = new Schema({
  // define schema
  name: String,
  description: String,
  image_url: String,
  difficultyLevel: { type: String, required: true },
  accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory'}]

})

// create a model
const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;




