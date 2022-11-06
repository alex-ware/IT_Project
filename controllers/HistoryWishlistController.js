const db = require('../models/index')
const mongoose = require('mongoose')

// Display item history according to the user logged in.
const get_item_history = async(req, res, next) => {
    try {
        const item_history = await db.collection('User History Data').find({user_id: req.user._id}).sort({'date':-1}).limit(12).toArray()
        let all_item_info = []
        for (var i = 0; i < item_history.length; i++){
            item_id = item_history[i].item_id
            let item_info = await db.collection('Item Scraper').findOne({_id: item_id})
            if (item_info !== null && item_info !== '') {
                if (item_id !== item_info._id | item_info._id !== item_id) {
                    this_item_info = {
                    image: item_info.image,
                    name: item_info.title,
                    source: item_info.source,
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

// Remove item from history.
const remove_item_history = async(req, res, next) => {
    try {
        const this_item_id = mongoose.Types.ObjectId(req.params.id)
        await db.collection('User History Data').findOneAndDelete({item_id: this_item_id})
        res.redirect('/user/userHistory')
    } catch(err) {
        return next(err)
    }
}

// Display item wishlist according to the user logged in.
const get_item_wishlist = async(req, res, next) => {
    try {
        const item_wishlist = await db.collection('User Wishlist Data').find({user_id: req.user._id}).sort({'date':-1}).limit(12).toArray()
        let all_item_info = []
        for (var i = 0; i < item_wishlist.length; i++){
            item_id = item_wishlist[i].item_id
            let item_info = await db.collection('Item Scraper').findOne({_id: item_id})
            if (item_info !== null && item_info !== '') {
                if (item_id !== item_info._id | item_info._id !== item_id) {
                    this_item_info = {
                    image: item_info.image,
                    name: item_info.title,
                    source: item_info.source,
                    price: item_info.price,
                    type: item_info.type,
                    id: item_info._id
                    }
                    all_item_info.push(this_item_info)                    
                }
            }
        }
        res.render('wishlist', {data: all_item_info, layout: 'user.hbs'})
    } catch(err) {
        return next(err)
    }
}

// Add item to the wishlist.
const add_item_wishlist = async(req, res, next) => {
    try {
        const this_item_id = mongoose.Types.ObjectId(req.params.id)
        db.collection('User Wishlist Data').replaceOne(
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

// Remove item from the wishlist.
const remove_item_wishlist = async(req, res, next) => {
    try {
        const this_item_id = mongoose.Types.ObjectId(req.params.id)
        await db.collection('User Wishlist Data').findOneAndDelete({item_id: this_item_id})
        res.redirect('/user/wishlist')
    } catch(err) {
        return next(err)
    }
}

module.exports = {
    get_item_history,
    remove_item_history,
    get_item_wishlist,
    add_item_wishlist,
    remove_item_wishlist,
}