const router = require('express').Router();
const warehouseController = require('../controllers/warehouseController');

router
    .route('/')
    .get(warehouseController.index)
    .post(warehouseController.addWarehouse);

router
    .route('/:id')
    .get(warehouseController.singleWarehouse)
    .delete(warehouseController.deleteWarehouse);

module.exports = router;
