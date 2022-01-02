const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifySignup = require('../middleware/verifySignup')
const refreshToken = require('../controllers/auth.controller')

router.post('/register',verifySignup.checkDuplicateEmail,userController.Register)
router.post('/login', userController.login)
router.post('/refresh', refreshToken.login)
router.post('/api/auth/refreshtoken', refreshToken.refreshToken)




module.exports = router