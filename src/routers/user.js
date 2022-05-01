const express = require('express')
const {createNewUser, loginUser, logoutUser, logoutAll} = require('../controllers/user')
const auth = require('../middleware/auth')


const router = new express.Router()

router.post('/users',createNewUser)

router.post('/users/login',loginUser)

router.post('/users/logout',auth,logoutUser)

router.post('/users/logoutAll',auth,logoutAll)

router.get('/users/me',(req,res)=>{res.send("hola")})

router.patch('/users/me')

router.delete('/users/me')


module.exports = router