'use strict';

const express = require('express');
const router = express.Router();

const request = require('request-promise');

const refineSearch = function(response, letter) {
  const items = response.tracks.items;

  const tracks = items.map((item) => {
    return {
      name: item.name,
      artist: item.artists[0].name,
      preview_url: item.preview_url
    };
  });

  const filtered = tracks.filter((title) => {
    return title.name.startsWith(letter);
  });

  return filtered;
};

router.get('/spotify', (req, res, next) => {
  const { letter, genre } = req.query;

  request({ uri: `https://api.spotify.com/v1/search?q=${letter}*%20genre:%22${genre}%22&type=track&limit=50`,
    json: true })
      .then((response) => {
        const refined = refineSearch(response, letter);

        const track = refined[Math.floor(Math.random() * refined.length)];

        if (refined.length !== 0) {
          return res.send(track);
        }

        const err = new Error('No tracks with this genre and letter.');

        err.status = 400;

        throw err;
      })
      .catch((err) => {
        next(err);
      });
});

module.exports = router;
