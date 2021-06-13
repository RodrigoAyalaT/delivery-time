const mongoose = require('mongoose');


const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const SequenceNumberSchema = new Schema({

    identifier: {type: String, required: true, unique: true},
    sequence: {type: Number, required: true, default: 0}


});


SequenceNumberSchema.plugin(mongoosePaginate);
SequenceNumberSchema.plugin(uniqueValidator, {message: 'validation.unique'});

const SequenceNumber = mongoose.model('SequenceNumber', SequenceNumberSchema);

module.exports = SequenceNumber;
