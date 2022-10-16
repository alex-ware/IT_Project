const mongoose = require('mongoose')
const Schema = mongoose.Schema

const historySchema = new mongoose.Schema({
    user_id: { type: Schema.Types.ObjectId, required: true},
    item_id: { type: Schema.Types.ObjectId, required: true},
}, {collection:'User History Data', versionKey: false})

const userHistory = mongoose.model('User History Data', historySchema)
module.exports = userHistory