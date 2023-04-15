const { v4: uuid } = require('uuid');
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

module.exports = { index, singleInventory };
