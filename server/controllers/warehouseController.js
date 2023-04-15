const { v4: uuid } = require('uuid');
const validation = require('./validation');
const knex = require('knex')(require('../knexfile'));

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

module.exports = { addWarehouse };
