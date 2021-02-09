const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cube = require('./cube');

const accessorySchema = new Schema({
  name: String,
  description: String,
  imageUrl: String,
  cubes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Cube' }]

})

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;






