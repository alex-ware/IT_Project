const home = (req, res) => {
    res.render('home', {loggedIn: req.user})
}

module.exports = {
    home,
}