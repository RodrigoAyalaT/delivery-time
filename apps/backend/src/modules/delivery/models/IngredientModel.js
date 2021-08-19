const mongoose = require('mongoose');



const mongoosePaginate = require('mongoose-paginate-v2');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
 name: {type: String, required: true, unique: true}
});




IngredientSchema.plugin(mongoosePaginate);
IngredientSchema.plugin(uniqueValidator, {message: 'validation.unique'});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;
