const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

logger.info(`Server running on port ${config.PORT}`)

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})