const express = require('express')
const homeRouter = express.Router()
const homeController = require('../controllers/homecontroller.js')
const pcPartsController = require('../controllers/pcPartsController')
const User = require('../models/user')

homeRouter.get('/', homeController.home)

// Handle registration of new user
homeRouter.get('/createAccount', homeController.createAccount)
homeRouter.post('/createAccount', (req, res, next) => {
    data = req.body;
    User.findOne({username: data.username}, (err, user) => {
        if (err) {return err}
        else if (user) {
            req.flash('error', 'This email has already been registered.')
            res.redirect('/createAccount')
        }
        else {
            User.create(data, (err, user) => {
                if (err) return next(err)
                req.flash('error', 'Your account has been created. Please log in.')
                res.redirect('/login')
            })
            }
    })
})

homeRouter.get('/cpu', pcPartsController.get_cpu_data)
homeRouter.get('/gpu', pcPartsController.get_gpu_data)
homeRouter.get('/ram', pcPartsController.get_ram_data)
homeRouter.get('/motherboard', pcPartsController.get_motherboard_data)
homeRouter.get('/power_supply', pcPartsController.get_powersupply_data)
homeRouter.get('/homepage/:id', pcPartsController.get_homepage_item)
homeRouter.get('/best_buy', pcPartsController.get_best_deals)
homeRouter.get('/best_buy/:id', pcPartsController.get_item_deal)

module.exports = homeRouter