const { v4: uuid } = require('uuid');
const knex = require('knex')(require('../knexfile'));

const index = (_req, res) => {
    knex('inventories')
        .then(data => {
            data.map(item => {
                delete item.created_at;
                delete item.updated_at;
            });
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).send(`Error retrieving Inventories: ${err}`);
        });
};

module.exports = { index };
