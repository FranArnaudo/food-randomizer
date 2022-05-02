const Ingredient = require('../models/ingredient')

const addIngredient = async(req,res) =>{
  try {
    const ingredient = new Ingredient({name: req.body.name})
    await ingredient.save()
    res.status(201).send({ingredient})
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getAllIngredients = async(req,res)=>{
  const match = {}
  const sort = {}
  if(req.query.name){
    match.name = req.query.name
  }
  if(req.query.sortBy){
    let [sortField, sortOrder] = req.query.sortBy.split('_') //! Esto fuerza a que la query venga como query&sortBy=name_order
    sort[sortField] = sortOrder
  }
  try {
    const ingredients = await Ingredient.find(match).sort(sort)
    res.send(ingredients)
  } catch (error) {
    res.status(400).send(error)
  }
}




module.exports = {addIngredient,getAllIngredients}