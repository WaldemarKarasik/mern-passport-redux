const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, min: 6},
    role: {type: String, enum: ['admin', 'user'], required: true},
    words: [{type: mongoose.Schema.Types.ObjectId, ref: 'Word'}]
})

module.exports = mongoose.model('User', UserSchema)