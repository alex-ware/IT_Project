const db = require('../models/index')

const get_cpu_data = async(req, res, next) => {
    try {
        const cpu_info = await db.collection('CPU Scraper').find({}).sort({$natural:-1}).limit(12).toArray()
        res.render('cpu', {data: cpu_info})
    } catch(err) {
        return next(err)
    }
}

const get_gpu_data = async(req, res, next) => {
    try {
        const gpu_info = await db.collection('GPU Scraper').find({}).sort({$natural:-1}).limit(12).toArray()
        res.render('gpu', {data: gpu_info})
    } catch(err) {
        return next(err)
    }
}

const get_ram_data = async(req, res, next) => {
    try {
        const ram_info = await db.collection('RAM Scraper').find({}).sort({$natural:-1}).limit(12).toArray()
        res.render('ram', {data: ram_info})
    } catch(err) {
        return next(err)
    }
}

const get_motherboard_data = async(req, res, next) => {
    try {
        const motherboard_info = await db.collection('Motherboard Scraper').find({}).sort({$natural:-1}).limit(12).toArray()
        res.render('motherboard', {data: motherboard_info})
    } catch(err) {
        return next(err)
    }
}

const get_powersupply_data = async(req, res, next) => {
    try {
        const powersupply_info = await db.collection('Power Supplies Scraper').find({}).sort({$natural:-1}).limit(12).toArray()
        res.render('powerSupply', {data: powersupply_info})
    } catch(err) {
        return next(err)
    }
}
const get_cpu_data_user = async(req, res, next) => {
    try {
        const cpu_info = await db.collection('CPU Scraper').find({}).sort({$natural:-1}).limit(12).toArray()
        res.render('cpuUser', {layout: 'user.hbs', data: cpu_info})
    } catch(err) {
        return next(err)
    }
}

const get_gpu_data_user = async(req, res, next) => {
    try {
        const gpu_info = await db.collection('GPU Scraper').find({}).sort({$natural:-1}).limit(12).toArray()
        res.render('gpuUser', {layout: 'user.hbs', data: gpu_info})
    } catch(err) {
        return next(err)
    }
}

const get_ram_data_user = async(req, res, next) => {
    try {
        const ram_info = await db.collection('RAM Scraper').find({}).sort({$natural:-1}).limit(12).toArray()
        res.render('ramUser', {layout: 'user.hbs', data: ram_info})
    } catch(err) {
        return next(err)
    }
}

const get_motherboard_data_user = async(req, res, next) => {
    try {
        const motherboard_info = await db.collection('Motherboard Scraper').find({}).sort({$natural:-1}).limit(12).toArray()
        res.render('motherboardUser', {layout: 'user.hbs', data: motherboard_info})
    } catch(err) {
        return next(err)
    }
}

const get_powersupply_data_user = async(req, res, next) => {
    try {
        const powersupply_info = await db.collection('Power Supplies Scraper').find({}).sort({$natural:-1}).limit(12).toArray()
        res.render('powerSupplyUser', {layout: 'user.hbs', data: powersupply_info})
    } catch(err) {
        return next(err)
    }
}

module.exports = {
    get_cpu_data,
    get_gpu_data,
    get_ram_data,
    get_motherboard_data,
    get_powersupply_data,
    get_motherboard_data_user,
    get_cpu_data_user, 
    get_powersupply_data_user,
    get_gpu_data_user,
    get_ram_data_user
}
