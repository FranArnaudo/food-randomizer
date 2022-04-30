const User = require("../models/user")


const createNewUser = async(req,res) =>{
  const user = new User(req.body)
  try {
    const token = await user.generateJWT()
    await user.save()
    res.status(201).send(user, token)
  } catch (error) {
    res.status(400).send(error)
  }
}

const loginUser = async(req,res)=>{
  const user = await User.findOne({username:req.body.username})
  try {
    if(!user){
      throw new Error(`Username or password are incorrect`)
    }
    if(!user.comparePassword(req.body.password)){
      throw new Error(`Username or password are incorrect`)
    }
    const token = await user.generateJWT()
    res.status(200).send({user, token})
  } catch (error) {
    res.status(400).send()
  }
}
module.exports = {createNewUser, loginUser}