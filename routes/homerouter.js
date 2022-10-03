const express = require('express')
const homeRouter = express.Router()
//const homeController = require('../controllers/homeController.js')
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
homeRouter.get('/motherboard', pcPartsController.get_motherboard_data)
homeRouter.get('/powerSupply', pcPartsController.get_powersupply_data)
homeRouter.get('/ram', pcPartsController.get_ram_data)
homeRouter.get('/bestBuy', homeController.bestBuy)
homeRouter.get('/gpuItem', homeController.gpuItem)
homeRouter.get('/cpuItem', homeController.cpuItem)
homeRouter.get('/ramItem', homeController.ramItem)
homeRouter.get('/motherboardItem', homeController.motherboardItem)
homeRouter.get('/powerSupplyItem', homeController.powerSupplyItem)


module.exports = homeRouter