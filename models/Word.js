const mongoose = require('mongoose')

const WordSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    key: {type: String, required: true, unique: true},
    definition: {type: String, required: true, unique: true},
    link_sentence: {type: String, required: true, unique: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Word'}
})

module.exports = mongoose.model('Word', WordSchema)