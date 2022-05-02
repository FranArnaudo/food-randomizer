const express = require("express");
const userRouter = require('./routers/user')
const ingredientsRouter = require('./routers/ingredients')

require('./db/mongoose')
const app = express();
app.use(express.json());
app.use(userRouter)
app.use(ingredientsRouter)
module.exports = app;
