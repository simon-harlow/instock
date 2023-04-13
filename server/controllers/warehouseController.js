const validation = require('./validation');

const knex = require('knex')(require('../knexfile'));

const addWarehouse = (req, res) => {
    if (
        !req.body.warehouse_name ||
        !req.body.address ||
        !req.body.city ||
        !req.body.country ||
        !req.body.contact_name ||
        !req.body.contact_position ||
        !validation.emailValidate(req.body.contact_email) ||
        !req.body.contact_phone
    ) {
        return res.status(400).send('Please enter valid fields');
    }

    knex('warehouse').then(data => {
        res.send('success');
    });
};

module.exports = { addWarehouse };
