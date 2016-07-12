'use strict';

const express = require('express');
const router = express.Router();

const ev = require('express-validation');
const validations = require('../validations/playlists');
const knex = require('../knex');

router.get('/playlists', (req, res, next) => {
  knex('playlists')
    .orderBy('id')
    .then((playlists) => {
      res.send(playlists);
    })
    .catch((err) => {
      next(err);
    });
});



router.post('/playlists', (req, res, next) => {
  const genre_id = Number.parseInt(req.body.genre_id);
  const tracks = req.body.tracks;
  const name = req.body.name;

  knex('genres')
    .where('id', genre_id)
    .first()
    .then((genre) => {
      if (!genre) {
        const err = new Error('Invalid genre id.');
        err.status = 400;

        throw err;
      }
      
      return knex('playlists')
        .insert({ genre_id: genre_id, title: name }, '*')
        .then((playlists) => {
          return playlists[0].id;
        })
    })
    .then((playlist_id) => {

      return knex('tracks')
        .insert(tracks, '*')
        .then((insertedTracks) => {
          return insertedTracks.map((track) => {
            return {track_id: track.id, playlist_id: playlist_id};
          });
        })
    })
    .then((playlists_tracks) => {
      knex('playlists_tracks')
        .insert(playlists_tracks, '*')
        .then((playlists_tracks) => {
          res.send(playlists_tracks[0]);
        })
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
