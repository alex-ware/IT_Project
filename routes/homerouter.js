const express = require('express')
const homeRouter = express.Router()
const homeController = require('../controllers/homeController.js')

homeRouter.get('/', homeController.home)
homeRouter.get('/createAccount', homeController.createAccount)
homeRouter.get('/accountCreated', homeController.accountCreated)
homeRouter.get('/cpu', homeController.cpu)
homeRouter.get('/gpu', homeController.gpu)
homeRouter.get('/motherboard', homeController.motherboard)
homeRouter.get('/powerSupply', homeController.powerSupply)
homeRouter.get('/ram', homeController.ram)
homeRouter.get('/bestBuy', homeController.bestBuy)

module.exports = homeRouter