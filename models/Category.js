const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    words: [{type: mongoose.Types.ObjectId, ref: 'Word'}]
})

module.exports = mongoose.model('Category', CategorySchema)