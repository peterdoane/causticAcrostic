'use strict';

const express = require('express');
const router = express.Router();

const ev = require('express-validation');
const request = require('request-promise');
// const validations = require('../validations/playlists_tracks');
const knex = require('../knex');

router.get('/spotify', (req, res, next) => {
  const { letter, genre } = req.query;


  request({uri: `https://api.spotify.com/v1/search?q=${letter}*%20genre:%22${genre}%22&type=track&limit=50`,
  json: true})
    .then((response) => {
      const items = response.tracks.items;

      const tracks = items.map((item) => {
	      return {
			        name: item.name,
			        artist: item.artists[0].name,
			        preview_url: item.preview_url
		          };
	    });

      const filtered = tracks.filter((title) => {
	      return title.name.startsWith(`${letter}`);
      });
      

      res.send(filtered);
    })
    .catch((err) => {
      next(err);
    })
});

module.exports = router;
