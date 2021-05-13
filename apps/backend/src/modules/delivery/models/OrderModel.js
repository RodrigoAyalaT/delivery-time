const mongoose = require('mongoose'); 



const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({ 

 name: {type: String, required: false, unique: false},
 phone: {type: String, required: true, unique: false},
 email: {type: String, required: false, unique: false},
 address: {type: String, required: false, unique: false},
 state: {type: String, enum: ['NUEVO','PREPARADO','EN_CAMINO','ENTREGADO'], required: false},
 number: {type: Number, required: false, unique: false}


}, { timestamps: true });




OrderSchema.plugin(mongoosePaginate);
OrderSchema.plugin(uniqueValidator, {message: 'validation.unique'});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;