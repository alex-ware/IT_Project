const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

// Schema for user authentication.
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {collection:'User', versionKey: false})

// Password verification.
userSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid)
    })
}

const SALT_FACTOR = 10

userSchema.pre('save', function save(next) {
    const user = this
    if (!user.isModified('password')) {
        return next()
    }

    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
        if (err) {
            return next(err)
        }
        
        user.password = hash
        next()
    })
})

const User = mongoose.model('User', userSchema)
module.exports = User