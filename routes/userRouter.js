const express = require('express')
const bodyParser = require("body-parser");
const user_router = express.Router()

user_router.use(bodyParser.urlencoded({extended: true}));

// Show homepage
user_router.get('/homepage', (req, res) => {
    res.render('userHomepage', { email: req.user.username })
})

// Handle logout
user_router.post('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

module.exports = user_router