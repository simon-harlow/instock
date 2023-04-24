const router = require('express').Router();
const inventoryController = require('../controllers/inventoryController');

router
    .route('/')
    .get((req, res) => {
        if (req.query.sort_by) {
            inventoryController.inventoriesSorted(req, res);
        } else {
            inventoryController.index(req, res);
        }
    })
    .post(inventoryController.addInventory);

router
    .route('/:id')
    .get(inventoryController.singleInventory)
    .put(inventoryController.updateInventory)
    .delete(inventoryController.deleteInventory);

module.exports = router;