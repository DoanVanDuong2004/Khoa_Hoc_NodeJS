const express = require('express')
const accessController = require('../../controllers/access.controller')
const { apiKey } = require('../../auth/checkAuth')
const router = express.Router()
//sign up
router.post('/shop/signup', apiKey, accessController.signUp)
module.exports = router