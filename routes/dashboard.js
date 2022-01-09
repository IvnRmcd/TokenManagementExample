const express = require('express')
const router = express.Router()
const dashboard = require('../controllers/dashboard.controller')
const  verifyJwt  = require('../middleware/Authjwt')


router.get('/user',verifyJwt.verifyToken,dashboard.user )
router.get('/admin', verifyJwt.verifyToken, dashboard.admin)


module.exports = router