const home = (req, res) => {
    res.render('home')
}

const createAccount = (req,res) => {
    res.render('createAccount')
}

const accountCreated = (req,res) => {
    res.render('accountCreated')
}

module.exports = {
    home,
    createAccount,
    accountCreated,
}