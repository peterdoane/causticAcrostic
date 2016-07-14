'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    name: Joi.string()
      .required()
      .label('Playlist title')
      .trim()
  }
};
