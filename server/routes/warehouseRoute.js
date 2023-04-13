const router = require('express').Router();
const warehouseController = require('../controllers/warehouseController');

router.route('/').post(warehouseController.addWarehouse);

module.exports = router;