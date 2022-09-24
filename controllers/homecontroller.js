const home = (req, res) => {
    res.render('home')
}

const createAccount = (req,res) => {
    res.render('createAccount', { flash: req.flash('error') })
}

const cpu = (req,res) => {
    res.render('cpu')
}

const cpuItem= (req,res) =>{
    res.render('cpuItem')
}

function gpu(req, res) {
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
    cpu,
    cpuItem,
    gpu,
    ram,
    motherboard,
    powerSupply,
    bestBuy,
}