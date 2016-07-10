'use strict';

exports.seed = function(knex) {
  return knex('playlists_tracks').del()
    .then(() => {
      return knex('playlists_tracks').insert([
        {
          id: 1,
          track_id: 1,
          playlist_id: 1
        },
        {
          id: 2,
          track_id: 2,
          playlist_id: 1
        },
        {
          id: 3,
          track_id: 3,
          playlist_id: 1
        },
        {
          id: 4,
          track_id: 4,
          playlist_id: 1
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('playlists_tracks_id_seq', (SELECT MAX(id) FROM playlists_tracks));"
      );
  });
};
