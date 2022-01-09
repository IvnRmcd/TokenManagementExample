const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifySignup = require('../middleware/verifySignup')
const authController = require('../controllers/auth.controller')
const authjwt = require('../middleware/Authjwt')

// registration route
router.post('/register',verifySignup.checkDuplicateEmail,userController.Register)


//route created to display the access token 
//router.post('/login', userController.login)

router.post('/login', authController.login)

//route used to check the refreshtoken
router.post('/auth/refreshtoken', authController.refreshToken)





module.exports = router