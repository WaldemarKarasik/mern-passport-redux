const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const app = express()
const config = require('config')
app.use(cookieParser())
app.use(express.json())

mongoose.connect(config.get('mongoUri'),{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true},(err => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to database')
    }
}))

app.use('/user', require('./routes/user'))
app.use('/category', require('./routes/category'))
app.use('/word', require('./routes/word'))


app.listen(config.get('port'), () => console.log('server started'))

