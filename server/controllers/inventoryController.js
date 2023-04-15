const { v4: uuid } = require('uuid');
const validation = require('./validation');
const knex = require('knex')(require('../knexfile'));

const selectInventory = () =>
    knex('inventories')
        .join('warehouses', 'inventories.warehouse_id', '=', 'warehouses.id')
        .select(
            'inventories.id',
            'warehouse_name',
            'item_name',
            'description',
            'category',
            'status',
            'quantity'
        );

const index = (_req, res) => {
    selectInventory()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).send(`Error retrieving Inventories: ${err}`);
        });
};

const singleInventory = (req, res) => {
    selectInventory()
        .where('inventories.id', req.params.id)
        .then(data => {
            if (data.length === 0) {
                return res
                    .status(404)
                    .send(`Record with id: ${req.params.id} is not found`);
            }
            res.status(200).json(data[0]);
        })
        .catch(err =>
            res
                .status(400)
                .send(`Error retrieving warehouse ${req.params.id} ${err}`)
        );
};

const updateInventory = (req, res) => {
    if (
        !validation.uuidValidate(req.body.warehouse_id) ||
        !validation.nonEmptyValidate(req.body.item_name) ||
        !validation.nonEmptyValidate(req.body.description) ||
        !validation.nonEmptyValidate(req.body.category) ||
        !validation.nonEmptyValidate(req.body.status) ||
        !validation.quantityValidate(req.body.quantity)
    ) {
        return res.status(400).send('Please enter valid fields');
    }

    // Check if warehouse_id is a valid foreign key value in the warehouses table
    knex('warehouses')
        .where({ id: req.body.warehouse_id })
        .select('id')
        .then((rows) => {
            if (!rows.length) {
                return res.status(400).send(`warehouse_id: ${req.body.warehouse_id} does not exist in the warehouses table`);
            }

            return knex('inventories')
                .update(req.body)
                .where({ id: req.params.id })
                .then(() => {
                    res.status(200).send(`Inventory with id: ${req.params.id} has been updated`);
                })
                .catch((err) =>
                    res.status(400).send(`Error updating Inventory ${req.params.id} ${err}`)
                );
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving Inventory ${req.params.id} ${err}`)
        );
};

module.exports = { index, singleInventory, updateInventory };