const express = require('express')
const bodyParser = require("body-parser");
const user_router = express.Router()
const pcPartsController = require('../controllers/pcPartsController')
const historyController = require('../controllers/historyController')
user_router.use(bodyParser.urlencoded({extended: true}));

// Show homepage
user_router.get('/', function(req, res) {
    res.render('userHomepage', { name: req.user.name, layout: 'user.hbs' })
})

user_router.get('/cpu', pcPartsController.get_cpu_data_user)
user_router.get('/gpu', pcPartsController.get_gpu_data_user)
user_router.get('/ram', pcPartsController.get_ram_data_user)
user_router.get('/motherboard', pcPartsController.get_motherboard_data_user)
user_router.get('/power_supply', pcPartsController.get_powersupply_data_user)
user_router.get('/homepage/:id', pcPartsController.get_homepage_item_user)
user_router.get('/best_buy', pcPartsController.get_best_deals_user)
user_router.get('/best_buy/:id', pcPartsController.get_item_deal_user)

user_router.get('/wishlist', function(req, res) {
    res.render('wishlist', {layout: 'user.hbs' })
})

user_router.get('/userHistory', historyController.get_item_history)
user_router.get('/remove/:id', historyController.remove_item_history)

// Handle logout
user_router.post('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

module.exports = user_router