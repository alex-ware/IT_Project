const mongoose = require('mongoose')
const Schema = mongoose.Schema

const historySchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, required: true},
    item_id: { type: Schema.Types.ObjectId, required: true},
}, {collection:'User History Data', versionKey: false})

const userHistory = mongoose.model('User History Data', historySchema)

const wishlistSchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, required: true},
    item_id: { type: Schema.Types.ObjectId, required: true},
}, {collection:'User Wishlist Data', versionKey: false})

const userWishlist = mongoose.model('User Wishlist Data', wishlistSchema)

module.exports = {
    userHistory,
    userWishlist,
}