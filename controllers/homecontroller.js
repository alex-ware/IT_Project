const home = (req, res) => {
    res.render('home', {loggedIn: req.user})
}
const login = (req,res) => {
    res.render('login')
}
const createAccount = (req,res) => {
    res.render('createAccount')
}
const accountCreated = (req,res) => {
    res.render('accountCreated')
}
module.exports = {
    home,
    login,
    createAccount,
    accountCreated
}