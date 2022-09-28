const express = require('express')
const bodyParser = require("body-parser");
const user_router = express.Router()
const pcPartsController = require('../controllers/pcPartsController')
user_router.use(bodyParser.urlencoded({extended: true}));

// Show homepage
user_router.get('/', function(req, res) {
    res.render('userHomepage', { email: req.user.username, layout: 'user.hbs' })
})

user_router.get('/gpu', pcPartsController.get_gpu_data)

user_router.get('/cpu', pcPartsController.get_cpu_data)

user_router.get('/motherboard', pcPartsController.get_motherboard_data)

user_router.get('/ram', pcPartsController.get_ram_data)

user_router.get('/powerSupply', pcPartsController.get_powersupply_data)

user_router.get('/wishlist', function(req, res) {
    res.render('wishlist', {layout: 'user.hbs' })
})
user_router.get('/userHistory', function(req, res) {
    res.render('userHistory', {layout: 'user.hbs' })
})
user_router.get('/cpuItem', function(req, res) {
    res.render('cpuItem', {layout: 'user.hbs' })
})
user_router.get('/gpuItem', function(req, res) {
    res.render('gpuItem', {layout: 'user.hbs' })
})
user_router.get('/ramItem', function(req, res) {
    res.render('ramItem', {layout: 'user.hbs' })
})
user_router.get('/motherboardItem', function(req, res) {
    res.render('motherboardItem', {layout: 'user.hbs' })
})
user_router.get('/powerSupplyItem', function(req, res) {
    res.render('powerSupplyItem', {layout: 'user.hbs' })
})

// Handle logout
user_router.post('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

module.exports = user_router