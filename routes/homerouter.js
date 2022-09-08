const express = require('express')
const homeRouter = express.Router()
const homeController = require('../controllers/homeController.js')

homeRouter.get('/', homeController.home)
homeRouter.get('/login',homeController.login)
homeRouter.get('/createaccount',homeController.createAccount)
module.exports = homeRouter