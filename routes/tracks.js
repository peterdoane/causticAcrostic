'use strict';

const express = require('express');
const router = express.Router();

const ev = require('express-validation');
const validations = require('../validations/tracks');
const knex = require('../knex');

router.get('/tracks', (req, res, next) => {
  knex.select('artist', 'name', 'preview_url')
    .from('tracks')
    .where('tracks.name', 'like', req.query.letter + '%')
    .then((tracks) => {
      const track = tracks[Math.floor(Math.random() * tracks.length)];
      res.send(track);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
