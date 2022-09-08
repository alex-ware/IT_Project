const home = (req, res) => {
    res.render('home', {loggedIn: req.user})
}

const login = (req,res) => {
    res.render('login')
}

const createAccount = (req,res) => {
    res.render('createAccount')
}

module.exports = {
    home,
    login,
    createAccount,
}