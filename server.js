const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = require('./server/routes/weather-api')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'dist')))
app.use(express.static(path.join(__dirname,'node_modules')))


mongoose.connect("mongodb://localhost/Weather-App")
app.use('/', api)
const PORT = 3000
app.listen(PORT,function () {
    console.log("server is set");
})