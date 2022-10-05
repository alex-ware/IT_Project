const db = require('../models/index')
const mongoose = require('mongoose')

const get_cpu_data = async(req, res, next) => {
    try {
        const cpu_info = await db.collection('CPU Scraper').find({}).sort({$natural:-1}).limit(12).toArray()
        res.render('cpu', {data: cpu_info})
    } catch(err) {
        return next(err)
    }
}

const get_cpu_item = async(req, res, next) => {
    try {
        const this_cpu_id = mongoose.Types.ObjectId(req.params.id)
        const cpu_item_info = await db.collection('CPU Scraper').findOne({_id : this_cpu_id})
        res.render('cpuItem', {data: cpu_item_info})
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

const get_gpu_item = async(req, res, next) => {
    try {
        const this_gpu_id = mongoose.Types.ObjectId(req.params.id)
        const gpu_item_info = await db.collection('GPU Scraper').findOne({_id : this_gpu_id})
        res.render('gpuItem', {data: gpu_item_info})
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

const get_ram_item = async(req, res, next) => {
    try {
        const this_ram_id = mongoose.Types.ObjectId(req.params.id)
        const ram_item_info = await db.collection('RAM Scraper').findOne({_id : this_ram_id})
        res.render('ramItem', {data: ram_item_info})
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

const get_motherboard_item = async(req, res, next) => {
    try {
        const this_motherboard_id = mongoose.Types.ObjectId(req.params.id)
        const motherboard_item_info = await db.collection('Motherboard Scraper').findOne({_id : this_motherboard_id})
        res.render('motherboardItem', {data: motherboard_item_info})
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

const get_powersupply_item = async(req, res, next) => {
    try {
        const this_powersupply_id = mongoose.Types.ObjectId(req.params.id)
        const powersupply_item_info = await db.collection('Power Supplies Scraper').findOne({_id : this_powersupply_id})
        res.render('powerSupplyItem', {data: powersupply_item_info})
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

const get_cpu_item_user = async(req, res, next) => {
    try {
        const this_cpu_id = mongoose.Types.ObjectId(req.params.id)
        const cpu_item_info = await db.collection('CPU Scraper').findOne({_id : this_cpu_id})
        res.render('cpuItem', {layout: 'user.hbs', data: cpu_item_info})
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

const get_gpu_item_user = async(req, res, next) => {
    try {
        const this_gpu_id = mongoose.Types.ObjectId(req.params.id)
        const gpu_item_info = await db.collection('GPU Scraper').findOne({_id : this_gpu_id})
        res.render('gpuItem', {layout: 'user.hbs', data: gpu_item_info})
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

const get_ram_item_user = async(req, res, next) => {
    try {
        const this_ram_id = mongoose.Types.ObjectId(req.params.id)
        const ram_item_info = await db.collection('RAM Scraper').findOne({_id : this_ram_id})
        res.render('ramItem', {layout: 'user.hbs', data: ram_item_info})
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

const get_motherboard_item_user = async(req, res, next) => {
    try {
        const this_motherboard_id = mongoose.Types.ObjectId(req.params.id)
        const motherboard_item_info = await db.collection('Motherboard Scraper').findOne({_id : this_motherboard_id})
        res.render('motherboardItem', {layout: 'user.hbs', data: motherboard_item_info})
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

const get_powersupply_item_user = async(req, res, next) => {
    try {
        const this_powersupply_id = mongoose.Types.ObjectId(req.params.id)
        const powersupply_item_info = await db.collection('Power Supplies Scraper').findOne({_id : this_powersupply_id})
        res.render('powerSupplyItem', {layout: 'user.hbs', data: powersupply_item_info})
    } catch(err) {
        return next(err)
    }
}

module.exports = {
    get_cpu_data,
    get_cpu_item,
    get_cpu_data_user, 
    get_cpu_item_user,
    get_gpu_data,
    get_gpu_item,
    get_gpu_data_user,
    get_gpu_item_user,
    get_ram_data,
    get_ram_item,
    get_ram_data_user,
    get_ram_item_user,
    get_motherboard_data,
    get_motherboard_item,
    get_motherboard_data_user,
    get_motherboard_item_user,
    get_powersupply_data,
    get_powersupply_item,
    get_powersupply_data_user,
    get_powersupply_item_user,
}
