const { v4: uuid } = require('uuid');
const validation = require('./validation');
const knex = require('knex')(require('../knexfile'));

const selectWarehouse = keyWord =>
    keyWord === undefined
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
              .where('warehouse_name', keyWord)
              .orWhere('address', keyWord)
              .orWhere('city', keyWord)
              .orWhere('country', keyWord)
              .orWhere('contact_name', keyWord)
              .orWhere('contact_position', keyWord)
              .orWhere('contact_phone', keyWord)
              .orWhere('contact_email', keyWord);

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
                return res
                    .status(404)
                    .send(`Record with id: ${req.params.id} is not found`);
            }

            delete data[0].created_at;
            delete data[0].updated_at;
            res.status(200).json(data[0]);
        })
        .catch(err =>
            res
                .status(400)
                .send(`Error retrieving warehouse ${req.params.id} ${err}`)
        );
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
                res.status(404).send(
                    `Error warehouse with id: ${req.params.id} is not defined`
                );
            } else {
                res.status(200).send(updatedWarehouse);
            }
        })
        .catch(err => {
            res.status(400).send(
                `Error warehouse with id: ${req.params.id} err ${err}`
            );
        });
};

const deleteWarehouse = (req, res) => {
    knex('warehouses')
        .delete()
        .where({ id: req.params.id })
        .then(data => {
            if (data === 0) {
                res.status(400).send(
                    `Warehouse with id: ${req.params.id} does not exist`
                );
            } else {
                res.status(200).send(
                    `Warehouse with id: ${req.params.id} has been deleted`
                );
            }
        })
        .catch(err =>
            res
                .status(400)
                .send(`Error deleting Warehouse ${req.params.id} ${err}`)
        );
};

const getInventories = (req, res) => {
    knex('inventories')
        .where({ warehouse_id: req.params.id })
        .select('id', 'item_name', 'category', 'status', 'quantity')
        .then(data => {
            if (data.length === 0) {
                res
                    .status(404)
                    .send(`Record with id: ${req.params.id} is not found`);
            }
            else{
                res.status(200).send(data);
            }
        })
        .catch(err =>
            res
                .status(400)
                .send(`Error retrieving warehouse ${req.params.id} ${err}`)
        );
};

module.exports = {
    index,
    singleWarehouse,
    addWarehouse,
    deleteWarehouse,
    editWarehouse,
    getInventories,
};
