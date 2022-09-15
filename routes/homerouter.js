const express = require('express')
const homeRouter = express.Router()
const homeController = require('../controllers/homeController.js')
const User = require('../models/user')

homeRouter.get('/', homeController.home)

// Handle registration of new user
homeRouter.get('/createAccount', homeController.createAccount)
homeRouter.post('/createAccount', (req, res, next) => {
    data = req.body;
    User.create(data, (err, user) => {
        if (err) return next(err);
        res.redirect('/login');
    });
});

homeRouter.get('/cpu', homeController.cpu)
homeRouter.get('/gpu', homeController.gpu)
homeRouter.get('/motherboard', homeController.motherboard)
homeRouter.get('/powerSupply', homeController.powerSupply)
homeRouter.get('/ram', homeController.ram)
homeRouter.get('/bestBuy', homeController.bestBuy)

module.exports = homeRouter