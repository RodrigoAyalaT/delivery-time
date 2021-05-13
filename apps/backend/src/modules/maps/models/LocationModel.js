const mongoose = require('mongoose'); 



const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({ 

 address: {type: String, required: true, unique: false},
 floor: {type: String, required: false, unique: false},
 apartment: {type: String, required: false, unique: false},
 latitude: {type: Number, required: false, unique: false},
 longitude: {type: Number, required: false, unique: false},
 country: {type: String, required: false, unique: false},
 province: {type: String, required: false, unique: false},
 locality: {type: String, required: false, unique: false},
 postalCode: {type: String, required: false, unique: false}


});




LocationSchema.plugin(mongoosePaginate);
LocationSchema.plugin(uniqueValidator, {message: 'validation.unique'});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;