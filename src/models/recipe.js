const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
    unique: true
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

recipeSchema.pre('save',async function(next){
  const recipe = this
  recipe.name = recipe.name.toLowerCase().replace(/  +/g, ' ')
  if(recipe.isModified('name')){
    const existingRecipe = await Recipe.findOne({name:recipe.name})
    if(existingRecipe){
      throw new Error('A recipe with that name already exists')
    }
  }
  next()
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe