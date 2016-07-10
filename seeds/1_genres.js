'use strict';

exports.seed = function(knex) {
  return knex('genres').del()
    .then(() => {
      return knex('genres').insert([
      {
        id: 1,
        name: 'Death Metal'
      },
      {
        id: 2,
        name: 'Black Metal'
      },
      {
        id: 3,
        name: 'Grindcore'
      },
      {
        id: 4,
        name: 'Doom Metal'
      },
      {
        id: 5,
        name: 'Thrash Metal'
      },
      {
        id: 6,
        name: 'Hardcore Punk'
      },
      {
        id: 7,
        name: 'Riot Grrrl'
      },
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('genres_id_seq', (SELECT MAX(id) FROM genres));"
    );
  });
};
