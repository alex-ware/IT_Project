const home = (req, res) => {
    res.render('home', {loggedIn: req.user})
}
const login = (req,res) => {
    res.render('login')
}
module.exports = {
    home,
    login,
}