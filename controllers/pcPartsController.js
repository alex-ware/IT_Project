const db = require('../models/index')

const get_cpu_data = async(req, res, next) => {
    try {
        const cpu_info = await db.collection('CPU Scraper').findOne({})
        res.render('cpu', {cpuName: cpu_info.title, cpuPrice: cpu_info.price, cpuImage: cpu_info.image})
    } catch(err) {
        return next(err)
    }
}

module.exports = {get_cpu_data}
