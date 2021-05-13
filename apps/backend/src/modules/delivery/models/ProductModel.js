const mongoose = require('mongoose'); 



const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({ 

 name: {type: String, required: true, unique: false},
 description: {type: String, required: false, unique: false},
 image: {type: String, required: false, unique: false},
 price: {type: Number, required: true, unique: false},
 stock: {type: Number, required: false, unique: false},
 active: {type: Boolean, required: false}


}, { timestamps: true });




ProductSchema.plugin(mongoosePaginate);
ProductSchema.plugin(uniqueValidator, {message: 'validation.unique'});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;