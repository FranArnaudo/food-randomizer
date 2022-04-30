const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
  calification: {
    type: Number,
    min: 1,
    max: 5,
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
  },
  ingredients: [{
    ingredient:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient'
    }
  }]
});

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe