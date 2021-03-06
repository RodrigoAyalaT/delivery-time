const mongoose = require('mongoose');



const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');
const softDelete = require('mongoose-softdelete')

const Schema = mongoose.Schema;

const ProductSchema = new Schema({

 name: {type: String, required: true, unique: false},
 description: {type: String, required: false, unique: false},
 image: {type: String, required: false, unique: false},
 price: {type: Number, required: true, unique: false},
 stock: {type: Number, required: false, unique: false},
 active: {type: Boolean, required: false},
 ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: "Ingredient",required: false, unique: false}],
 category: {type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory", required: true, unique: false}


}, { timestamps: true });




ProductSchema.plugin(mongoosePaginate);
ProductSchema.plugin(uniqueValidator, {message: 'validation.unique'});
ProductSchema.plugin(softDelete)

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
