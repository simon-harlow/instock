exports.down = function (knex) {
    return knex.schema.dropTable('warehouse');
};

exports.up = function (knex) {
    return knex.schema.createTable('warehouse', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
    });
};
