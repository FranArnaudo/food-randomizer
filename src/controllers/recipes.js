const Recipe = require("../models/recipe");

const addRecipe = async (req, res) => {
	try {
		const recipe = new Recipe(req.body);
		recipe.ingredients = [];
		req.body.ingredients.map(({ ingredient }) => {
			recipe.ingredients.push(ingredient);
		});
		await recipe.save();
		res.status(201).send(recipe);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

//!Comento esta funcion para el fran del futuro porque cuando la lea de nuevo no me voy a acordar a simple vista la verdad
const getRecipes = async (req, res) => {
  try {
    //?separo los id que trae la query que vendria algo como esto
    ///recipes?ingredients=626f4c592670bf07d5c0b396,626fd08d1770c056e0874132,626f4c592670bf07d5c0b397
    let ingredients = req.query.ingredients.split(',')
    //Por cada id en el array resultante creo UN OBJETO que tiene adentro ingredients._id ENTRE COMILLAS como campo
    //porque para hacer referencia al field dentro de un field de una coleccion se hace con comillas
    //y el valor de la id como resultado de eso. 
    //Entonces el array queda como 
    //[{ 'ingredients._id': '626f4c592670bf07d5c0b396' },{ 'ingredients._id': '626f46db738fde6ce48cf436' }]
    //con eso uso $and: en el find, que el $and se usa con un array de condiciones, y esto que hicimos en el match, es el array necesario
    ingredients = ingredients.map( ingredientId => {return {"ingredients._id" : ingredientId}})
    const sort = {}
    if(req.query.sortBy){
      const [sortField,sortOrder] = req.query.sortBy.split('_')
      sort[sortField] = sortOrder
    }
    const recipes = await Recipe.find({$and:ingredients})
    res.send(recipes)
  } catch (error) {
    res.status(400).send(error.message)
  }
};


const updateRecipe = async(req,res) =>{
  try {
    const recipe = await Recipe.findOneAndUpdate({_id:req.params.id},req.body)
    await recipe.save()
    res.send(recipe)
  } catch (error) {
    res.status(400).send(error.message)
  }

}

const deleteRecipe = async(req,res) =>{
  try {
    const recipe = await Recipe.findOneAndDelete({_id:req.params.id})
    await recipe.save()
    res.send("Recipe deleted succesfully")
  } catch (error) {
    res.status(400).send(error.message)
  }
}
module.exports = { addRecipe, getRecipes, updateRecipe, deleteRecipe};
