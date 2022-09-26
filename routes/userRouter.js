const express = require('express')
const bodyParser = require("body-parser");
const user_router = express.Router()

user_router.use(bodyParser.urlencoded({extended: true}));

// Show homepage
user_router.get('/', function(req, res) {
    res.render('userHomepage', { email: req.user.username, layout: 'user.hbs' })
})
user_router.get('/gpu', function(req, res) {
    res.render('gpu', {layout: 'user.hbs' })
})
user_router.get('/cpu', function(req, res) {
    res.render('cpu', {layout: 'user.hbs' })
})
user_router.get('/motherboard', function(req, res) {
    res.render('motherboard', {layout: 'user.hbs' })
})
user_router.get('/ram', function(req, res) {
    res.render('ram', {layout: 'user.hbs' })
})
user_router.get('/powerSupply', function(req, res) {
    res.render('powerSupply', {layout: 'user.hbs' })
})
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