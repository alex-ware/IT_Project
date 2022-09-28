const home = (req, res) => {
    res.render('home');
}

const createAccount = (req,res) => {
    res.render('createAccount', { flash: req.flash('error') })
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

const cpuItem= (req,res) => {
    res.render('cpuItem')
}
const gpuItem = (req,res) => {
    res.render('gpuItem')
}
const ramItem = (req,res) => {
    res.render('ramItem')
}
const powerSupplyItem = (req,res) => {
    res.render('powerSupplyItem')
}
const motherboardItem = (req,res) => {
    res.render('motherboardItem')
}

module.exports = {
    home,
    createAccount,
    gpu,
    ram,
    motherboard,
    powerSupply,
    bestBuy,
    ramItem,
    gpuItem,
    cpuItem,
    motherboardItem,
    powerSupplyItem,
}