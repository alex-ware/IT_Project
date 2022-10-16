const db = require('../models/index')
const mongoose = require('mongoose')

const get_item_history = async(req, res, next) => {
    try {
        /*const user_history = await db.collection('User History Data').sort({$natural: -1})*/
        const item_history = await db.collection('User History Data').find({user_id: req.user._id}).sort({$natural:-1}).limit(12).toArray()
        let all_item_info = []
        for (var i = 0; i < item_history.length; i++){
            item_id = item_history[i].item_id
            let item_info = await db.collection('Item Scraper').findOne({_id: item_id})
            if (item_info !== null && item_info !== '') {
                if (item_id !== item_info._id | item_info._id !== item_id) {
                    this_item_info = {
                    image: item_info.image,
                    name: item_info.title,
                    price: item_info.price,
                    type: item_info.type,
                    id: item_info._id
                    }
                    all_item_info.push(this_item_info)                    
                }
            }
        }
        res.render('userHistory', {data: all_item_info, layout: 'user.hbs'})
    } catch(err) {
        return next(err)
    }
}

const remove_item_history = async(req, res, next) => {
    try {
        const this_item_id = mongoose.Types.ObjectId(req.params.id)
        await db.collection('User History Data').findOneAndDelete({item_id: this_item_id})
        res.redirect('/user/userHistory')
    } catch(err) {
        return next(err)
    }
}

module.exports = {
    get_item_history,
    remove_item_history,
}