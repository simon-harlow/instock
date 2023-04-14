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

    knex('warehouse').then(data => {
        res.send('success');
    });
};

module.exports = { addWarehouse };
