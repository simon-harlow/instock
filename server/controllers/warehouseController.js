const { v4: uuid } = require('uuid');
const validation = require('./validation');
const knex = require('knex')(require('../knexfile'));

const selectWarehouse = keyWord =>
    keyWord === undefined || keyWord === ''
        ? knex('warehouses').select(
              'id',
              'warehouse_name',
              'address',
              'city',
              'country',
              'contact_name',
              'contact_position',
              'contact_phone',
              'contact_email'
          )
        : knex('warehouses')
              .select(
                  'id',
                  'warehouse_name',
                  'address',
                  'city',
                  'country',
                  'contact_name',
                  'contact_position',
                  'contact_phone',
                  'contact_email'
              )
              .where('warehouse_name', 'like', `%${keyWord}%`)
              .orWhere('address', 'like', `%${keyWord}%`)
              .orWhere('city', 'like', `%${keyWord}%`)
              .orWhere('country', 'like', `%${keyWord}%`)
              .orWhere('contact_name', 'like', `%${keyWord}%`)
              .orWhere('contact_position', 'like', `%${keyWord}%`)
              .orWhere('contact_phone', 'like', `%${keyWord}%`)
              .orWhere('contact_email', 'like', `%${keyWord}%`);

const index = (req, res) => {
    selectWarehouse(req.query.s)
        .then(data => {
            if (data.length === 0) {
                return res.status(404).json('No record is found');
            } else {
                return res.status(200).json(data);
            }
        })
        .catch(err => {
            res.status(400).send(`Error retrieving Warehouses: ${err}`);
        });
};

const singleWarehouse = (req, res) => {
    knex('warehouses')
        .where({ id: req.params.id })
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send(`Record with id: ${req.params.id} is not found`);
            }

            delete data[0].created_at;
            delete data[0].updated_at;
            res.status(200).json(data[0]);
        })
        .catch(err => res.status(400).send(`Error retrieving warehouse ${req.params.id} ${err}`));
};

const addWarehouse = (req, res) => {
    if (
        !validation.nonEmptyValidate(req.body.warehouse_name) ||
        !validation.nonEmptyValidate(req.body.address) ||
        !validation.nonEmptyValidate(req.body.city) ||
        !validation.nonEmptyValidate(req.body.country) ||
        !validation.nonEmptyValidate(req.body.contact_name) ||
        !validation.nonEmptyValidate(req.body.contact_position) ||
        !validation.emailValidate(req.body.contact_email) ||
        !validation.phoneValidate(req.body.contact_phone)
    ) {
        return res.status(400).send('Please enter valid fields');
    }

    const newWarehouse = { id: uuid(), ...req.body };

    knex('warehouses')
        .insert(newWarehouse)
        .then(_data => {
            res.status(201).send(newWarehouse);
        })
        .catch(err => {
            res.status(400).send(`Error creating Warehouse: ${err}`);
        });
};

const editWarehouse = (req, res) => {
    if (
        !validation.nonEmptyValidate(req.body.warehouse_name) ||
        !validation.nonEmptyValidate(req.body.address) ||
        !validation.nonEmptyValidate(req.body.city) ||
        !validation.nonEmptyValidate(req.body.country) ||
        !validation.nonEmptyValidate(req.body.contact_name) ||
        !validation.nonEmptyValidate(req.body.contact_position) ||
        !validation.emailValidate(req.body.contact_email) ||
        !validation.phoneValidate(req.body.contact_phone)
    ) {
        return res.status(400).send('Please enter valid fields');
    }
    const updatedWarehouse = { id: req.params.id, ...req.body };
    console.log(updatedWarehouse);
    knex('warehouses')
        .update(updatedWarehouse)
        .where({ id: req.params.id })
        .then(data => {
            if (data === 0) {
                res.status(404).send(`Error warehouse with id: ${req.params.id} is not defined`);
            } else {
                res.status(200).send(updatedWarehouse);
            }
        })
        .catch(err => {
            res.status(400).send(`Error warehouse with id: ${req.params.id} err ${err}`);
        });
};

const deleteWarehouse = (req, res) => {
    knex('warehouses')
        .delete()
        .where({ id: req.params.id })
        .then(data => {
            if (data === 0) {
                res.status(400).send(`Warehouse with id: ${req.params.id} does not exist`);
            } else {
                res.status(200).send(`Warehouse with id: ${req.params.id} has been deleted`);
            }
        })
        .catch(err => res.status(400).send(`Error deleting Warehouse ${req.params.id} ${err}`));
};

const getInventories = (req, res) => {
    knex('inventories')
        .where({ warehouse_id: req.params.id })
        .select('id', 'item_name', 'category', 'status', 'quantity')
        .then(data => {
            if (data.length === 0) {
                res.status(404).send(`Record with id: ${req.params.id} is not found`);
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => res.status(400).send(`Error retrieving warehouse ${req.params.id} ${err}`));
};

const warehousesSorted = (_req, res) => {
    let { sort_by: columns, order_by: order } = _req.query;
    columns = columns.split(',');
    const validColumns = [
        'warehouse_name',
        'address',
        'city',
        'country',
        'contact_name',
        'contact_phone',
        'contact_email',
    ];
    const invalidColumns = columns.filter(column => !validColumns.includes(column));
    if (invalidColumns.length > 0) {
        return res
            .status(400)
            .send(`Invalid column(s): ${invalidColumns.join(', ')}. Valid columns: ${validColumns.join(', ')}`);
    }
    const validOrders = ['asc', 'desc'];
    if (!validOrders.includes(order)) {
        return res.status(400).send(`Invalid order. Valid orders: ${validOrders.join(', ')}`);
    }
    knex('warehouses')
        .select('*')
        .orderBy(columns.map(column => ({ column: column, order: order })))
        .then(data => {
            data.map(warehouse => {
                delete warehouse.created_at;
                delete warehouse.updated_at;
            });
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).send(`Error retrieving Warehouses: ${err}`);
        });
};

module.exports = {
    index,
    singleWarehouse,
    addWarehouse,
    deleteWarehouse,
    editWarehouse,
    getInventories,
    warehousesSorted,
};
