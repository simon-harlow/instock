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

const singleInventory = (req, res) => {
    knex('inventories')
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

module.exports = { index, singleInventory };
