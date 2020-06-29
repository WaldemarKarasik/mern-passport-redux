const {Router} = require('express')
const passport = require('passport')
const passportConfig = require('../passport')
const Category = require('../models/Category')
const Word = require('../models/Word')
const JWT = require('jsonwebtoken')
const serverError = require('../helpers/errors').serverError

const router = Router()

router.get('/list', async (req,res) => {
    const words = await Word.find()
    const wordsToObject = {...words}
    if (words) {
        return res.json(words)
    }
    return serverError(res)
})


router.post('/create', passport.authenticate('jwt', {session:false}), (req,res) => {
    if (req.user.role !== 'admin') {
        return res.status(401)
    }
    const {name, category, key, definition, link_sentence} = req.body
    Word.findOne({name}, async (err, foundWord) => {
        if (err) {
            return serverError(res)
        }
        if(foundWord) {
            return res.status(403).json({message: {msgBody: "This word already exists", msgError: true}})
        }
        const categoryStep = await Category.findOne({name: category})
        let categoryId
        if (categoryStep) {
            categoryId = categoryStep._id
        }
        const newWord = new Word({name, key, definition, link_sentence, category: categoryId})
        
        newWord.save((err, createdWord) => {
            if (err) {
                console.log(err)
                return serverError(res)
            }
            if (createdWord) {
                Category.findOne({name: category}, (err, foundCategory) => {
                    if(err) {
                        return serverError(res)
                    }
                    if(foundCategory) {
                       foundCategory.words.push(createdWord._id)
                        foundCategory.save((err, word) => {
                            if(err) {
                                return serverError(res)
                            }
                            if(word) {
                                console.log(word)
                            }
                        })
                    }
                })
                return res.status(201).json({message: {msgBody: "Word created", msgError: false}, word: createdWord})
            }
        })
    })
})

router.get('/:name', async (req,res) => {
    const {name} = req.params
    try {
        const word = await Word.findOne({name})
        if (word) {
            return res.json(word)
        } else {
            return res.status(403).json({message: {msgBody: "Couldn't find the word", msgError: true}})
        }
    } catch (e) {
        return serverError(res)
    }
})

module.exports = router