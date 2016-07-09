'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('playlists_tracks', (table) => {
    table.increments();
    table.integer('track_id')
      .notNullable()
      .references('id')
      .inTable('tracks')
      .onDelete('CASCADE')
      .index();
    table.integer('playlist_id')
      .notNullable()
      .references('id')
      .inTable('playlists')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);

  });

};

exports.down = function(knex) {
  return knex.schema.dropTable('playlists_tracks');
};
