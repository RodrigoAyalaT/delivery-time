const mongoose = require('mongoose');


const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');
const PolygonSchema = require('./PolygonSchema')
const Schema = mongoose.Schema;

const ZoneSchema = new Schema({

    name: {type: String, required: true, unique: false},
    color: {type: String, required: false, unique: false},
    location: {type: PolygonSchema, required: true,  index: '2dsphere'}

});
ZoneSchema.index({ location: '2dsphere' });

ZoneSchema.plugin(mongoosePaginate);
ZoneSchema.plugin(uniqueValidator, {message: 'validation.unique'});

const Zone = mongoose.model('Zone', ZoneSchema);

module.exports = Zone;
