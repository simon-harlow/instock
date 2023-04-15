const router = require('express').Router();
const warehouseController = require('../controllers/warehouseController');

router
    .route('/')
    .get(warehouseController.index)
    .post(warehouseController.addWarehouse);

module.exports = router;
