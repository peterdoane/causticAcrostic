'use strict';

exports.seed = function(knex) {
  return knex('playlists').del()
    .then(() => {
      return knex('playlists').insert([
        {
          id: 1,
          title: 'OPEN',
          genre_id: 3
        }
      ]);
    });
};
