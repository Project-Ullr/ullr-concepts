const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

const PORT = 8000

app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./config/mongoose.config')
require('./routes/resort.routes')(app)
require('./routes/user.routes')(app)
require('dotenv').config()

app.listen(PORT, () => {
    console.log('Server listening on port: ' + PORT)
})