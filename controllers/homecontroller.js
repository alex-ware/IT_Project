const home = (req, res) => {
    res.render('home')
}

const createAccount = (req,res) => {
    res.render('createAccount')
}

const accountCreated = (req,res) => {
    res.render('accountCreated')
}

const cpu = (req,res) => {
    res.render('cpu')
}

const gpu = (req,res) => {
    res.render('gpu')
}

const ram = (req,res) => {
    res.render('ram')
}

const motherboard = (req,res) => {
    res.render('motherboard')
}

const powerSupply = (req,res) => {
    res.render('powerSupply')
}

const bestBuy = (req,res) => {
    res.render('bestBuy')
}


module.exports = {
    home,
    createAccount,
    accountCreated,
    cpu,
    gpu,
    ram,
    motherboard,
    powerSupply,
    bestBuy,
}