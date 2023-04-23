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

    // if time, we can re-factor this to be a join on the warehouse_id field
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
                .then((data) => {
                    if (data === 0) {
                        res.status(400).send(`Inventory item with id ${req.params.id} not found`);
                    } else {
                        const updatedItem = {
                            id: req.params.id,
                            ... req.body
                        };
                        res.status(200).send(updatedItem);
                    }
                })
                .catch((err) =>
                    res.status(400).send(`Error updating Inventory ${req.params.id} ${err}`)
                );
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving Inventory ${req.params.id} ${err}`)
        );
};


const deleteInventory = (req, res) => {

    knex('inventories')
        .delete()
        .where('id', '=', req.params.id)
        .then((data) => {
            if (data === 0) {
                res.status(404).send(`Inventory item with id: ${req.params.id} not found`);
            } else{
                res.status(200).send(`Inventory item with id: ${req.params.id} has been deleted`);
            }
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving Inventory ${req.params.id} ${err}`)
        );
};


const addInventory = (req, res) => {
    console.log(req.body);
    if (
        !validation.nonEmptyValidate(req.body.warehouse_id) ||
        !validation.nonEmptyValidate(req.body.item_name) ||
        !validation.nonEmptyValidate(req.body.description) ||
        !validation.nonEmptyValidate(req.body.category) ||
        !validation.nonEmptyValidate(req.body.status) ||
        !validation.quantityValidate(req.body.quantity)
    ) {
        return res.status(400).send('Please enter valid fields');
    }
    knex('warehouses')
        .where({ id: req.body.warehouse_id })
        .select('id')
        .then((rows) => {
            if (!rows.length) {
                return res.status(400).send(`warehouse_id: ${req.body.warehouse_id} does not exist in the warehouses table`);
            }
            else{
                const newInventory = {id: uuid(), ...req.body};
                return knex('inventories')
                    .insert(newInventory)
                    .then(data => {
                        res.status(201).send(newInventory);
                    })
            }
        })
        .catch((err) =>
            res.status(400).send(`Error creating inventory ${req.params.id} ${err}`)
        );
    
};

const inventoriesSorted = (_req, res) => {
    let { sort_by: columns, order_by: order } = _req.query;
    columns = columns.split(',');
    const validColumns = [ 'item_name', 'category', 'status', 'quantity', 'warehouse_id'];
    const invalidColumns = columns.filter(column => !validColumns.includes(column));
    if (invalidColumns.length > 0) {
        return res.status(400).send(`Invalid column(s): ${invalidColumns.join(', ')}. Valid columns: ${validColumns.join(', ')}`);
    }
    const validOrders = ['asc', 'desc'];
    if (!validOrders.includes(order)) {
        return res.status(400).send(`Invalid order. Valid orders: ${validOrders.join(', ')}`);
    }
    knex('inventories')
        .select('*')
        .orderBy(columns.map(column => ({ column: column, order: order })))
        .then(data => {
            data.map(inventories => {
                delete inventories.created_at;
                delete inventories.updated_at;
            });
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).send(`Error retrieving Inventories: ${err}`);
        });
};

module.exports = { index, singleInventory, updateInventory, deleteInventory, addInventory, inventoriesSorted };