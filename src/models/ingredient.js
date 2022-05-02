const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	}
},{
	toJSON: {virtuals: true}
});

ingredientSchema.virtual('recipe',{
	ref:'Recipe',
	localField: '_id',
	foreignField: 'ingredients.ingredient'
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

module.exports = Ingredient