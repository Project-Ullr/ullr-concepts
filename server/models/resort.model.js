const mongoose = require('mongoose')

const ResortSchema = mongoose.Schema({
    _id: {
        type: Number
    },
    name: {
        type: String
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    website: {
        type: String
    }
})

module.exports = mongoose.model('Resort', ResortSchema)