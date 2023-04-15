const { v4: uuid } = require('uuid');
const validation = require('./validation');
const knex = require('knex')(require('../knexfile'));

const index = (_req, res) => {
    knex('warehouses')
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

const deleteWarehouse = (req, res) => {
    knex('warehouses')
        .delete()
        .where({ id: req.params.id })
        .then((data) => {
            if (data === 0) {
                res.status(400).send(`Warehouse with id: ${req.params.id} does not exist`);
            } else {
                res.status(200).send(`Warehouse with id: ${req.params.id} has been deleted`);
            }
        })
        .catch((err) =>
            res.status(400).send(`Error deleting Warehouse ${req.params.id} ${err}`)
        );
};

module.exports = { index, singleWarehouse, addWarehouse, deleteWarehouse };
