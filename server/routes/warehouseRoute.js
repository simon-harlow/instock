const router = require('express').Router();
const warehouseController = require('../controllers/warehouseController');

router
    .route('/')
    .get((req, res) => {
        if (req.query.sort_by) {
            warehouseController.warehousesSorted(req, res);
        } else {
            warehouseController.index(req, res);
        }
    })
    .post(warehouseController.addWarehouse);

router
    .route('/:id')
    .get(warehouseController.singleWarehouse)
    .put(warehouseController.editWarehouse)
    .delete(warehouseController.deleteWarehouse);
    
router
    .route('/:id/inventories')
    .get(warehouseController.getInventories);

module.exports = router;