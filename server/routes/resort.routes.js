const ResortController = require('../controllers/resort.controller')

module.exports = app => {
    app.get('/api/get_all_resorts', ResortController.get_all_resorts)
}