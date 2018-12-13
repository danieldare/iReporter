const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateRedflagLocationInput(data) {
  const errors = {};

  data.location = !isEmpty(data.location) ? data.location : '';

  if (validator.isEmpty(data.location)) {
    errors.location = 'Location field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
