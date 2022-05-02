const express = require('express')
const auth = require('../middleware/auth')
const {addRecipe, getRecipes, updateRecipe, deleteRecipe} = require('../controllers/recipes')

const router = express.Router()

router.post('/recipes',auth,addRecipe)
router.get('/recipes',getRecipes)
router.patch('/recipes/:id',auth, updateRecipe)
router.delete('/recipes/:id',auth, deleteRecipe)

module.exports = router