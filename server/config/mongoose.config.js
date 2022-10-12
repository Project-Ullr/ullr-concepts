const mongoose = require('mongoose')
const DB_NAME = 'ski-resorts'

mongoose.connect('mongodb://127.0.0.1/' + DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Successfully connected to MongoDB.')
    })
    .catch(err => {
        console.log('Failed to connect to MongoDB.')
        console.error(err)
    })