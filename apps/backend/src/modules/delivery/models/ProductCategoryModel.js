const mongoose = require('mongoose');



const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ProductCategorySchema = new Schema({
 name: {type: String, required: true, unique: true},
 backgroundColor: {type: String, required: false},
 borderColor:  {type: String, required: false},
 fontColor: {type: String, required: false},
});




ProductCategorySchema.plugin(mongoosePaginate);
ProductCategorySchema.plugin(uniqueValidator, {message: 'validation.unique'});

const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema);

module.exports = ProductCategory;
