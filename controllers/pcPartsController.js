const db = require('../models/index')
const mongoose = require('mongoose')

// Get CPU items from the scraper to display it on the guest page.
const get_cpu_data = async(req, res, next) => {
    try {
        const cpu_info = await db.collection('Item Scraper').find({category: "cpu", type: "homepage"}).sort({$natural:-1}).limit(24).toArray()
        res.render('product', {title: "Processors", data: cpu_info})
    } catch(err) {
        return next(err)
    }
}

// Get CPU items from the scraper to display it on the user page.
const get_cpu_data_user = async(req, res, next) => {
    try {
        const cpu_info = await db.collection('Item Scraper').find({category: "cpu", type: "homepage"}).sort({$natural:-1}).limit(24).toArray()
        res.render('product', {layout: 'user.hbs', title: "Processors", data: cpu_info})
    } catch(err) {
        return next(err)
    }
}

// Get GPU items from the scraper to display it on the guest page.
const get_gpu_data = async(req, res, next) => {
    try {
        const gpu_info = await db.collection('Item Scraper').find({category: "gpu", type: "homepage"}).sort({$natural:-1}).limit(24).toArray()
        res.render('product', {title: "Graphics Cards", data: gpu_info})
    } catch(err) {
        return next(err)
    }
}

// Get GPU items from the scraper to display it on the user page.
const get_gpu_data_user = async(req, res, next) => {
    try {
        const gpu_info = await db.collection('Item Scraper').find({category: "gpu", type: "homepage"}).sort({$natural:-1}).limit(24).toArray()
        res.render('product', {layout: 'user.hbs', title: "Graphics Cards", data: gpu_info})
    } catch(err) {
        return next(err)
    }
}

// Get RAM items from the scraper to display it on the guest page.
const get_ram_data = async(req, res, next) => {
    try {
        const ram_info = await db.collection('Item Scraper').find({category: "ram", type: "homepage"}).sort({$natural:-1}).limit(24).toArray()
        res.render('product', {title: "Memory", data: ram_info})
    } catch(err) {
        return next(err)
    }
}

// Get RAM items from the scraper to display it on the user page.
const get_ram_data_user = async(req, res, next) => {
    try {
        const ram_info = await db.collection('Item Scraper').find({category: "ram", type: "homepage"}).sort({$natural:-1}).limit(24).toArray()
        res.render('product', {layout: 'user.hbs', title: "Memory", data: ram_info})
    } catch(err) {
        return next(err)
    }
}

// Get motherboard items from the scraper to display it on the guest page.
const get_motherboard_data = async(req, res, next) => {
    try {
        const motherboard_info = await db.collection('Item Scraper').find({category: "motherboard", type: "homepage"}).sort({$natural:-1}).limit(24).toArray()
        res.render('product', {title:"Motherboards", data: motherboard_info})
    } catch(err) {
        return next(err)
    }
}

// Get motherboard items from the scraper to display it on the user page.
const get_motherboard_data_user = async(req, res, next) => {
    try {
        const motherboard_info = await db.collection('Item Scraper').find({category: "motherboard", type: "homepage"}).sort({$natural:-1}).limit(24).toArray()
        res.render('product', {layout: 'user.hbs', title:"Motherboards", data: motherboard_info})
    } catch(err) {
        return next(err)
    }
}

// Get powersupply items from the scraper to display it on the guest page.
const get_powersupply_data = async(req, res, next) => {
    try {
        const powersupply_info = await db.collection('Item Scraper').find({category: "power_supply", type: "homepage"}).sort({$natural:-1}).limit(24).toArray()
        res.render('product', {title: "Power Supplies", data: powersupply_info})
    } catch(err) {
        return next(err)
    }
}

// Get powersupply items from the scraper to display it on the user page.
const get_powersupply_data_user = async(req, res, next) => {
    try {
        const powersupply_info = await db.collection('Item Scraper').find({category: "power_supply", type: "homepage"}).sort({$natural:-1}).limit(24).toArray()
        res.render('product', {layout: 'user.hbs', title: "Power Supplies", data: powersupply_info})
    } catch(err) {
        return next(err)
    }
}

// Display items' information on the guest page.
const get_homepage_item = async(req, res, next) => {
    try {
        const this_item_id = mongoose.Types.ObjectId(req.params.id)
        const item_info = await db.collection('Item Scraper').findOne({_id : this_item_id})
        //star_rating(item_info)
        res.render('item', {title: "Product Information", data: item_info})
    } catch(err) {
        return next(err)
    }
}

// Display items' information on the user page, also storing it on the user history. Ensure no duplicate item is stored.
const get_homepage_item_user = async(req, res, next) => {
    try {
        const this_item_id = mongoose.Types.ObjectId(req.params.id)
        const item_info = await db.collection('Item Scraper').findOne({_id : this_item_id})
        //star_rating(item_info)
        res.render('itemUser', {layout: 'user.hbs', title: "Product Information", data: item_info})

        db.collection('User History Data').replaceOne(
            {
                'user_id': req.user._id,
                'item_id': this_item_id
            },
            {
                'user_id': req.user._id,
                'item_id': this_item_id,
                'date': new Date()
            },
            {
                'upsert':true
            }
        )
    } catch(err) {
        return next(err)
    }
}

// Display Best Deals items on the guest page.
const get_best_deals = async(req, res, next) => {
    try {
        const cpu_best_deal = await db.collection('Item Scraper').find({type: "best_buy", category: "cpu"}).sort({$natural:-1}).limit(4).toArray()
        const gpu_best_deal = await db.collection('Item Scraper').find({type: "best_buy", category: "gpu"}).sort({$natural:-1}).limit(4).toArray()
        const ram_best_deal = await db.collection('Item Scraper').find({type: "best_buy", category: "ram"}).sort({$natural:-1}).limit(4).toArray()
        const motherboard_best_deal = await db.collection('Item Scraper').find({type: "best_buy", category: "motherboard"}).sort({$natural:-1}).limit(4).toArray()
        const powersupply_best_deal = await db.collection('Item Scraper').find({type: "best_buy", category: "power_supply"}).sort({$natural:-1}).limit(4).toArray()
        res.render('bestBuy', {cpu: cpu_best_deal, gpu: gpu_best_deal, ram: ram_best_deal, motherboard: motherboard_best_deal, powersupply: powersupply_best_deal})
    } catch(err) {
        return next(err)
    }
}

// Display Best Deals items on the user page.
const get_best_deals_user = async(req, res, next) => {
    try {
        const cpu_best_deal = await db.collection('Item Scraper').find({type: "best_buy", category: "cpu"}).sort({$natural:-1}).limit(4).toArray()
        const gpu_best_deal = await db.collection('Item Scraper').find({type: "best_buy", category: "gpu"}).sort({$natural:-1}).limit(4).toArray()
        const ram_best_deal = await db.collection('Item Scraper').find({type: "best_buy", category: "ram"}).sort({$natural:-1}).limit(4).toArray()
        const motherboard_best_deal = await db.collection('Item Scraper').find({type: "best_buy", category: "motherboard"}).sort({$natural:-1}).limit(4).toArray()
        const powersupply_best_deal = await db.collection('Item Scraper').find({type: "best_buy", category: "power_supply"}).sort({$natural:-1}).limit(4).toArray()
        res.render('bestBuy', {layout:'user.hbs', cpu: cpu_best_deal, gpu: gpu_best_deal, ram: ram_best_deal, motherboard: motherboard_best_deal, powersupply: powersupply_best_deal})
    } catch(err) {
        return next(err)
    }
}

// Display Best Deals items' information on the guest page.
const get_item_deal = async(req, res, next) => {
    try {
        const this_item_id = mongoose.Types.ObjectId(req.params.id)
        const item_info = await db.collection('Item Scraper').findOne({_id : this_item_id})
        res.render('bestBuyItem', {title: "Best Deals Product Information", data: item_info})
    } catch(err) {
        return next(err)
    }
}

// Display Best Deals items' information on the user page, also storing it on the user history. Ensure no duplicate item is stored.
const get_item_deal_user = async(req, res, next) => {
    try {
        const this_item_id = mongoose.Types.ObjectId(req.params.id)
        const item_info = await db.collection('Item Scraper').findOne({_id : this_item_id})
        res.render('bestBuyItemUser', {layout:'user.hbs', title: "Best Deals Product Information", data: item_info})

        db.collection('User History Data').replaceOne(
            {
                'user_id': req.user._id,
                'item_id': this_item_id
            },
            {
                'user_id': req.user._id,
                'item_id': this_item_id,
                'date': new Date()
            },
            {
                'upsert':true
            }
        )
    } catch(err) {
        return next(err)
    }
}

module.exports = {
    get_cpu_data,
    get_cpu_data_user, 
    get_gpu_data,
    get_gpu_data_user,
    get_ram_data,
    get_ram_data_user,
    get_motherboard_data,
    get_motherboard_data_user,
    get_powersupply_data,
    get_powersupply_data_user,
    get_homepage_item,
    get_homepage_item_user,
    get_best_deals,
    get_best_deals_user,
    get_item_deal,
    get_item_deal_user,
}
