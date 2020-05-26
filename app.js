/* eslint-disable no-unused-vars */
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const morgan = require('morgan')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')

logger.info('connecting to ', config.MONGODB_URI)

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('connected to MongoDB')
    }).catch((err) => {
        logger.error('Error connecting to MongoDB: ', err.message)
    })

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/api/blogs', blogRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app