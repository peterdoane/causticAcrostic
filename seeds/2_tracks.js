'use strict'

exports.seed = function(knex) {
  return knex('tracks').del()
    .then(() => {
      return knex('tracks').insert([
    {
     id: 1,
     name: 'Ohrwurm',
     artist: 'Cephalic Carnage',
     preview_url: 'https://p.scdn.co/mp3-preview/ef82f8170ba2800de7df2cc8489144f867cd52dc'
    },

    {
     id: 2,
     name: 'Paradogma',
     artist: 'Hour of Penance',
     preview_url: 'https://p.scdn.co/mp3-preview/a03b374e6853401197ffd5d0f625bfe117571eb1'
    },

    {
    id: 3,
    name: 'Eaten',
    artist: 'Bloodbath',
    preview_url: 'https://p.scdn.co/mp3-preview/68bc034b264410f6c140417e29c2eb3195b0d7bc'
    },

    {
     id: 4,
     name: 'Nucleon',
     artist: 'Wormed',
     preview_url: 'https://p.scdn.co/mp3-preview/96f2a54e38121c802b22574e45424f5b019e557b'
    }
  ]);
 })
 .then(() => {
    return knex.raw(
      "SELECT setval('tracks_id_seq', (SELECT MAX(id) FROM tracks));"
    );
  });
};
