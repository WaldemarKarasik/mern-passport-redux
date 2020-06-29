const {Router} = require('express')
const passport = require('passport')
const passportConfig = require('../passport')
const Category = require('../models/Category')
const JWT = require('jsonwebtoken')
const serverError = require('../helpers/errors').serverError

const router = Router()

router.get('/list', async (req,res) => {
    const categoriesWithNames = await Category.find().populate('words', 'name')
    res.json(categoriesWithNames)
})

router.post('/create', passport.authenticate('jwt', {session:false}), (req,res,) => {
    if (req.user.role !== 'admin') {
        return res.status(401)
    }
    const {name} = req.body
    const newCategory = new Category({name})
    newCategory.save((err, createdCategory) => {
        if(err) {
            return serverError(res)
        }
        return res.status(201).json({message: {msgBody: "Category created", msgError: false}, category: createdCategory})
    })
})


module.exports = router