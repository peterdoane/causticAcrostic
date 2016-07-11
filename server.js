'use strict';

const express = require('express');
const port = process.env.PORT || 8000;
const path = require('path');

const bodyParser = require('body-parser');
const morgan = require('morgan');

const playlists = require('./routes/playlists');
const tracks = require('./routes/tracks');
const playlists_tracks = require('./routes/playlists_tracks');

const app = express();

app.disable('x-powered-by');

app.use(morgan('short'));
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, 'public')));

app.use(playlists);
app.use(tracks);
//app.use(playlists_tracks);

app.use((_req, res) => {
  res.sendStatus(404);
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  if (err.status) {
    return res.status(err.status).send(err.message);
  }

  console.error(err);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
