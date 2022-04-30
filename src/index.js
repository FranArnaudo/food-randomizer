const app = require('./app')
const port = process.env.port

app.listen(port,()=>{
  console.log('Food Randomizer up and running in port',port)
})