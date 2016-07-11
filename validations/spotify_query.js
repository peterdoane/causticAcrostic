'use strict';

const Joi = require('joi');

module.exports.get = {
  query: {
    letter: Joi.string()
      .required()
      .label('Starting letter of track')
      .trim(),

    genre: Joi.string()
      .required()
      .label('Genre')
      .trim()
  }
};
