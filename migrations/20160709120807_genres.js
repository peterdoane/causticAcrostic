'use strict';
exports.up = function(knex) {
  return knex.schema.createTable('genres', (table) => {
    table.increments();
    table.string('name')
      .notNullable()
      .defaultTo('');
  });

};

exports.down = function(knex) {
  return knex.schema.dropTable('genres');
};
