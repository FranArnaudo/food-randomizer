const express = require("express");
const userRouter = require('./routers/user')
const ingredientsRouter = require('./routers/ingredients')
const recipeRouter = require('./routers/recipe')

require('./db/mongoose')
const app = express();
app.use(express.json());
app.use(userRouter)
app.use(ingredientsRouter)
app.use(recipeRouter)
module.exports = app;
