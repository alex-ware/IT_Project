const express = require('express')
const homeRouter = express.Router()
const homeController = require('../controllers/homeController.js')

homeRouter.get('/', homeController.home)
homeRouter.get('/createAccount', homeController.createAccount)
homeRouter.get('/accountCreated', homeController.accountCreated)

module.exports = homeRouter