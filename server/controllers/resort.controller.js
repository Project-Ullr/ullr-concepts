const Resort = require('../models/resort.model')

module.exports = {
    get_all_resorts: (request, response) => {
        Resort.find({})
            .then(all_resorts => response.json(all_resorts))
            .catch(error => response.json(error))
    }
}