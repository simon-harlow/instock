const inventoryData = require('../seed_data/02_inventories');
const warehouseData = require('../seed_data/01_warehouses');

exports.seed = function (knex) {
    return knex('warehouses')
        .del()
        .then(function () {
            return knex('warehouses').insert(warehouseData);
        })
        .then(() => {
            return knex('inventories')
        .del();
        })
        .then(() => {
            return knex('inventories').insert(inventoryData);
        });
};