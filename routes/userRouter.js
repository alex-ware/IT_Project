const express = require('express')
const bodyParser = require("body-parser");
const user_router = express.Router()
const pcPartsController = require('../controllers/pcPartsController')
user_router.use(bodyParser.urlencoded({extended: true}));

// Show homepage
user_router.get('/', function(req, res) {
    res.render('userHomepage', { email: req.user.username, layout: 'user.hbs' })
})

user_router.get('/gpuUser', pcPartsController.get_gpu_data_user)

user_router.get('/cpuUser', pcPartsController.get_cpu_data_user)

user_router.get('/motherboardUser', pcPartsController.get_motherboard_data_user)

user_router.get('/ramUser', pcPartsController.get_ram_data_user)

user_router.get('/powerSupplyUser', pcPartsController.get_powersupply_data_user)

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