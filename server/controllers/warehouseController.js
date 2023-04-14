const validation = require('./validation');

const knex = require('knex')(require('../knexfile'));

const fields = [
    'warehouse_name',
    'address',
    'city',
    'country',
    'contact_name',
    'contact_position',
    'contact_email',
    'contact_phone',
];

const addWarehouse = (req, res) => {
    // if (
    //     !validation.nonEmptyValidate(req.body.warehouse_name) ||
    //     !validation.nonEmptyValidate(req.body.address) ||
    //     !validation.nonEmptyValidate(req.body.city) ||
    //     !validation.nonEmptyValidate(req.body.country) ||
    //     !validation.nonEmptyValidate(req.body.contact_name) ||
    //     !validation.nonEmptyValidate(req.body.contact_position) ||
    //     !validation.emailValidate(req.body.contact_email) ||
    //     !req.body.contact_phone
    // ) {
    //     return res.status(400).send('Please enter valid fields');
    // }

    const isValid = fields.every(field => {
        const value = req.body[field];
        return (
            validation.nonEmptyValidate(value) ||
            (field === 'contact_email' && validation.emailValidate(value)) ||
            (field === 'contact_phone' && Boolean(value))
        );
    });

    if (!isValid) {
        return res.status(400).send('Please enter valid fields');
    }

    knex('warehouse').then(data => {
        res.send('success');
    });
};

module.exports = { addWarehouse };
