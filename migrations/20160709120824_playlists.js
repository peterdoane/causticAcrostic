'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('playlists', () => {
    table.increments();
    table.string('title')
      .notNullable()
      .defaultTo('');
    table.integer('genre_id')
      .notNullable()
      .references('id')
      .inTable('genres')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
  });

};

exports.down = function(knex) {
  return knex.schema.dropTable('tracks');
};
