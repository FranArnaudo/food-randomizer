const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    username:{
      type: String,
      required: true,
      minlength: 4,
      trim: true,
      unique: true
    },
    password:{
      type: String,
      required: true,
      minlength: 6,
      trim: true
    },
    tokens: [{
      token:{
        type: String,
      }
    }]
  },{
    timestamps: true
  }
)

userSchema.methods.generateJWT = async function(){
  const user = this;
  const token = jwt.sign({_id:user._id.toString()},process.env.JWTSECRET)
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

userSchema.methods.comparePassword = async function(password){
  const user = this
  if(bcrypt.compare(password,user.password)){
    return true
  }
  return false
}

userSchema.pre('save', async function(next){
  const user = this

  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password,8)
  }

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User