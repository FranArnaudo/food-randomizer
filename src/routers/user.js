const express = require('express')
const {createNewUser, loginUser} = require('../controllers/user')

const router = new express.Router()

router.post('/users',createNewUser)

router.post('/users/login',loginUser)

router.post('/users/logout')

router.post('/users/logoutAll')

router.get('/users/me',(req,res)=>{res.send("hola")})

router.patch('/users/me')

router.delete('/users/me')


module.exports = router