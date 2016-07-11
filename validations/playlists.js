'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    title: Joi.string()
      .required()
      .label('Playlist title')
      .trim()
  }
};
