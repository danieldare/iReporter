"use strict";

var validator = require('validator');

var isEmpty = require('./is_empty');

module.exports = function validateRedflagLocationInput(data) {
  var errors = {};
  data.latitude = !isEmpty(data.latitude) ? data.latitude : '';
  data.longitude = !isEmpty(data.longitude) ? data.longitude : '';

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

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};