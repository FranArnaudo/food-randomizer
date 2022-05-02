const express = require('express')
const { addIngredient, getAllIngredients } = require('../controllers/ingredients')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/ingredients',auth,addIngredient)
router.get('/ingredients',getAllIngredients)
router.patch('/ingredients/:id')
router.delete('/ingredients/:id')

module.exports = router