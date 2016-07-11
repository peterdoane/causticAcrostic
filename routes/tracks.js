'use strict';

const express = require('express');
const router = express.Router();

const ev = require('express-validation');
const validations = require('../validations/tracks');
const knex = require('../knex');

router.get('/tracks', (req, res, next) => {
  knex('tracks')
    .orderBy('name', 'asc')
    .then((tracks) => {
      res.send(tracks);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/tracks', ev(validations.post), (req, res, next) => {
  knex('tracks')
    .insert(req.body, '*')
    .then((tracks) => {
      res.send(tracks[0]);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
