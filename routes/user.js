const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifySignup = require('../middleware/verifySignup')
const authController = require('../controllers/auth.controller')

// Registration Route
router.post('/register',verifySignup.checkDuplicateEmail,userController.Register)

//Login Route
router.post('/login',authController.login)


//route used to check the refreshtoken
router.post('/auth/refreshtoken', authController.refreshToken)





module.exports = router