"use strict";

/* eslint-disable no-param-reassign */
var validator = require('validator');

var isEmpty = require('./is_empty');

module.exports = function validateRedflagInput(data) {
  var errors = {};
  data.title = !isEmpty(data.title) ? data.title : '';
  data.latitude = !isEmpty(data.latitude) ? data.latitude : '';
  data.longitude = !isEmpty(data.longitude) ? data.longitude : '';
  data.comments = !isEmpty(data.comments) ? data.comments : '';

  if (!validator.isLength(data.comments, {
    min: 25,
    max: 500
  })) {
    errors.comments = 'Comments must be between 25 and 500 characters';
  }

  if (validator.isEmpty(data.latitude)) {
    errors.latitude = 'Latitude field is required';
  } else if (!/^[0-9](\.[0-9]+)?$/.test(data.latitude)) {
    errors.latitude = 'Latitude field format not valid';
  }

  if (validator.isEmpty(data.longitude)) {
    errors.longitude = 'longitude field is required';
  } else if (!/^[0-9](\.[0-9]+)?$/.test(data.longitude)) {
    errors.longitude = 'Longitude field format not valid';
  }

  if (!validator.isLength(data.title, {
    min: 2,
    max: 500
  })) {
    errors.title = 'Title must be between 2 and 50 characters';
  }

  if (validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (validator.isEmpty(data.comments)) {
    errors.comments = 'Comments field is required';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};