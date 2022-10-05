const home = (req, res) => {
    res.render('home');
}

const createAccount = (req,res) => {
    res.render('createAccount', { flash: req.flash('error') })
}

const bestBuy = (req,res) => {
    res.render('bestBuy')
}

module.exports = {
    home,
    createAccount,
    bestBuy,
}