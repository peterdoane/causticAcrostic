'use strict';

const express = require('express');
const router = express.Router();

const ev = require('express-validation');
// const validations = require('../validations/playlists_tracks');
const knex = require('../knex');

router.get('/playlists_tracks', (req, res, next) => {
  knex('playlists_tracks')
    .orderBy('id')
    .then((playlists_tracks) => {
      res.send(playlists_tracks);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/playlists_tracks', (req, res, next) => {
  const track_id = Number.parseInt(req.body.track_id);
  const playlist_id = Number.parseInt(req.body.playlist_id);

  knex('tracks')
    .where('id', track_id)
    .first()
    .then((track) => {
      if (!track) {
        const err = new Error('Invalid track id.');
        err.status = 400;

        throw err;
      }

      return knex('playlists')
        .where('id', playlist_id)
        .first()
        .then((playlist) => {
          if (!playlist) {
            const err = new Error('Invalid playlist id.')
            err.status = 400;

            throw err;
          }
        });
    })
    .then(() => {
      return knex('playlists_tracks')
        .insert(req.body, '*')
        .then((playlists_tracks) => {
          res.send(playlists_tracks[0]);
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
