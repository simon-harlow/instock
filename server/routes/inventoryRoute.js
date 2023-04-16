const router = require('express').Router();
const inventoryController = require('../controllers/inventoryController');

router
    .route('/')
    .get(inventoryController.index);

router
    .route('/:id')
    .get(inventoryController.singleInventory)
    .put(inventoryController.updateInventory)
    .delete(inventoryController.deleteInventory);

module.exports = router;
