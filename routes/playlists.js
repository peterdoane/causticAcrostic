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

router.post('/playlists', ev(validations.post), (req, res, next) => {
  const genre_id = Number.parseInt(req.body.genre_id);
  const tracks = req.body.tracks;
  const  = req.body.playlist;

  knex('genres')
    .where('id', genre_id)
    .first()
    .then((genre) => {
      if (!genre) {
        const err = new Error('Invalid genre id.');
        err.status = 400;

        throw err;
      }
      knex('playlists')
        .insert(req.body, '*')
        .then((playlists) => {
          res.send(playlists[0]);
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
