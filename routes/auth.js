const passport = require('passport')
const express = require('express')
const router = express.Router()

// For Login page
router.get('/login', (req, res) => {
    res.render('login', { flash: req.flash('error'), title: 'Login' })
})

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/user/homepage', failureRedirect: '/login', failureFlash: true
    })
)

module.exports = router