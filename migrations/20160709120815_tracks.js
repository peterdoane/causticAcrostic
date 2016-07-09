'use strict';
exports.up = function(knex) {
  return knex.schema.createTable('tracks', (table) => {
    table.increments();
    table.string('name')
      .notNullable()
      .defaultTo('');
    table.string('artist')
      .notNullable()
      .defaultTo();
    table.string('preview_url')
      .notNullable()
      .defaultTo();
    table.timestamps(true, true);
  });

};

exports.down = function(knex) {
  return knex.schema.dropTable('tracks');
};
