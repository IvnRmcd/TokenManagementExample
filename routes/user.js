const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifySignup = require('../middleware/verifySignup')


router.post('/register',verifySignup.checkDuplicateEmail,userController.Register)
router.post('/login', userController.login)




module.exports = router