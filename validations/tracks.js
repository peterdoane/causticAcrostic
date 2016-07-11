'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    name: Joi.string()
      .label('Track name')
      .required()
      .trim(),

    artist: Joi.string()
      .label('Artist name')
      .required()
      .trim(),

    preview_url: Joi.string()
      .label('Mp3 URL')
      .required()
      .trim()
      .uri()
  }
};
