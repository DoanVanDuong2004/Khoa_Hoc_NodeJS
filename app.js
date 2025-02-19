const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
require('dotenv').config()
const app = express()

console.log(`Process::`,process.env);

// init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
// morgan("combined")
// morgan("common")
// morgan("short")
// morgan("tiny")
//init db
require('./src/dbs/init.mongodb')
const {checkOverload }=require('./src/helpers/check.connect')
checkOverload ()
//init routes
app.get('/', (req, res, next) => {
    const strCompress = 'Duong DZ Qua'
    return res.status(200).json({
        message: 'Welcome Van Duong DZ',
        metadata: strCompress.repeat(10000)
    })
})
//handing error
module.exports = app